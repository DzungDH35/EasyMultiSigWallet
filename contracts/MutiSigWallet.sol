// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "../interfaces/IERC20.sol";
import "./EasyToken.sol";

contract MultiSigWallet {

   // emitted when an owner is added
   event OwnerAddition(address indexed _owner);

   // emitted when an owner is removed
   event OwnerRemoval(address indexed _owner);

   // emitted when number of required signatures is changed
   event SigRequirementChange(uint indexed _requiredSigs);

   // emitted when a value is deposited in the wallet
   event Deposit(address indexed _sender, uint _value);

   // emitted when a transaction is submitted
   event Submission(uint indexed _transactionId);

   // emitted when a transaction submission is confirmed
   event Confirmation(address indexed _sender, uint indexed _transactionId);

   // emitted when a transaction submission is revoked
   event Revocation(address indexed _sender, uint indexed _transactionId);

   // emitted when a transaction is executed
   event Execution(uint indexed _transactionId);

   // emitted when a transaction execution fails
   event ExecutionFailure(uint indexed _transactionId);

   uint constant public MAX_OWNER_COUNT = 50;
   string constant ONLY_WALLET_MSG = "Only wallet's address is allowed!";
   string constant ADDRESS_NOT_NULL_MSG = "Address must not be null!";
   string constant OWNER_EXISTENCE_MSG = "This owner already exists!";
   string constant OWNER_NONEXISTENCE_MSG = "This owner does not exist!";
   string constant TRANSACTION_NONEXISTENCE_MSG = "This transaction does not exist!";
   string constant OWNER_NOT_SIGNED = "Transaction has not been signed confirmed yet!";
   string constant OWNER_SIGNED = "Transaction has been signed!";
   string constant TRANSACTION_EXECUTED = "Transaction was executed!";
   
   address[] public owners;
   mapping(address => bool) public isOwner;
   uint public requiredSigs; // number of required signatures for a transaction execution

   IERC20 public MyEasyToken;

   struct Transaction {
      address proposer; // who requests the transaction of token transfer
      address destination; // who will receive a number of tokens
      uint value; // value of tokens to be transferred
      bool executed; // transaction status of execution
   }
   mapping(uint => Transaction) public transactions; // id => information
   uint public transactionCount = 0;
   mapping(uint => mapping(address => bool)) public confirmations; // who has signed a transaction

   // only permit wallet's address to process
   modifier onlyWallet() {
      require(msg.sender == address(this), ONLY_WALLET_MSG);
      _;
   }

   modifier notNullAddress(address _address) {
      require(_address != address(0), ADDRESS_NOT_NULL_MSG);
      _;
   }

   modifier ownerDoesNotExist(address _owner) {
      require(!isOwner[_owner], OWNER_EXISTENCE_MSG);
      _;
   }

   modifier ownerExists(address _owner) {
      require(isOwner[_owner], OWNER_NONEXISTENCE_MSG);
      _;
   }

   // validate list of owners' address and number of required signatures
   modifier validRequirement(uint _ownerCount, uint _requiredSigs) {
      if (
         _ownerCount > MAX_OWNER_COUNT
         || _requiredSigs > _ownerCount
         || _ownerCount == 0
         || _requiredSigs == 0
      ) {
         revert("Invalid requirement!");
      }
      _;
   }

   modifier transactionExists(uint _transactionId) {
      require(transactions[_transactionId].destination != address(0), TRANSACTION_NONEXISTENCE_MSG);
      _;
   }

   // check if a transaction is confirmed(signed) by a owner
   modifier confirmed(uint _transactionId, address _owner) {
      require(confirmations[_transactionId][_owner], OWNER_NOT_SIGNED);
      _;
   }

   // check if a transaction is not confirmed(signed) by a owner
   modifier notConfirmed(uint _transactionId, address _owner) {
      require(!confirmations[_transactionId][_owner], OWNER_SIGNED);
      _;
   }

   modifier notExecuted(uint _transactionId) {
      require(!transactions[_transactionId].executed, TRANSACTION_EXECUTED);
      _;
   }

   // setup owners and number of required signatures for wallet
   constructor(address[] memory _owners, uint _requiredSigs)
      validRequirement(_owners.length, _requiredSigs)
   {
      MyEasyToken = new EasyToken(1000);
      for (uint i = 0; i < _owners.length; ++i) {
         require(_owners[i] != address(0), ADDRESS_NOT_NULL_MSG);
         require(!isOwner[_owners[i]], OWNER_EXISTENCE_MSG);
         isOwner[_owners[i]] = true;
      }
      owners = _owners;
      requiredSigs = _requiredSigs;
   }

   // fallback function
   fallback() external payable {
      if (msg.value > 0) {
         emit Deposit(msg.sender, msg.value);
      }
   }

   receive() external payable {
      if (msg.value > 0) {
         emit Deposit(msg.sender, msg.value);
      }
   }

   function addOwner(address _newOwner) 
      public
      onlyWallet
      ownerDoesNotExist(_newOwner)
      notNullAddress(_newOwner)
      validRequirement(owners.length + 1, requiredSigs)
   {
      owners.push(_newOwner);
      isOwner[_newOwner] = true;

      emit OwnerAddition(_newOwner);
   }

   function removeOwner(address _owner) 
      public
      onlyWallet
      ownerExists(_owner)
   {
      for (uint i = 0; i < owners.length; ++i) {
         if (owners[i] == _owner) {
            owners[i] = owners[owners.length - 1];
            break;
         }
      }
      owners.pop();

      if (requiredSigs > owners.length) {
         changeRequirement(owners.length);
      }

      emit OwnerRemoval(_owner);
   }

   function replaceOwner(address _owner, address _newOwner)
      public
      onlyWallet
      ownerExists(_owner)
      ownerDoesNotExist(_newOwner)
   {
      for (uint i = 0; i < owners.length; ++i) {
         if (owners[i] == _owner) {
            owners[i] = _newOwner;
         }
      }

      isOwner[_owner] = false;
      isOwner[_newOwner] = true;

      emit OwnerRemoval(_owner);
      emit OwnerAddition(_newOwner);
   }

   function changeRequirement(uint _requiredSigs) 
      public
      onlyWallet
      validRequirement(owners.length, _requiredSigs)
   {
      requiredSigs = _requiredSigs;
      emit SigRequirementChange(_requiredSigs);
   }

   function submitTransaction(address _destination, uint _value) 
      public
      returns (uint _transactionId)
   {
      _transactionId = addTransaction(_destination, _value);
      confirmTransaction(_transactionId);
   }

   // Add a new transaction if it has not existed yet
   function addTransaction(address _destination, uint _value) 
      internal
      notNullAddress(_destination)
      returns (uint _transactionId)
   {
      _transactionId = transactionCount;
      transactions[_transactionId] = Transaction({
         proposer: msg.sender,
         destination: _destination,
         value: _value,
         executed: false
      });
      transactionCount += 1;

      emit Submission(_transactionId);
   }

   function confirmTransaction(uint _transactionId) 
      public
      ownerExists(msg.sender)
      transactionExists(_transactionId)
      notConfirmed(_transactionId, msg.sender)
   {
      confirmations[_transactionId][msg.sender] = true;
      emit Confirmation(msg.sender, _transactionId);
      executeTransaction(_transactionId);
   }

   function revokeTransaction(uint _transactionId) 
      public
      ownerExists(msg.sender)
      confirmed(_transactionId, msg.sender)
      notExecuted(_transactionId)
   {
      confirmations[_transactionId][msg.sender] = false;
      emit Revocation(msg.sender, _transactionId);
   }

   function isConfirmed(uint _transactionId) 
      public
      view
      returns (bool)
   {
      uint count = 0;
      for (uint i = 0; i < owners.length; ++i) {
         if (confirmations[_transactionId][owners[i]])
            count += 1;
         if (count == requiredSigs)
            return true;
      }
      return false;
   }

   function executeTransaction(uint _transactionId) 
      internal
      notExecuted(_transactionId)
   {
      if (isConfirmed(_transactionId)) {
         Transaction memory transaction = transactions[_transactionId];
         transactions[_transactionId].executed = true;

         if (MyEasyToken.transfer(transaction.destination, transaction.value))
            emit Execution(_transactionId);
         else {
            transactions[_transactionId].executed = false;
            emit ExecutionFailure(_transactionId);
         }
      }
   }

   function getConfirmationCount(uint _transactionId)
      public
      view
      returns (uint count)
   {
      for (uint i = 0; i < owners.length; ++i)
         if (confirmations[_transactionId][owners[i]])
            count += 1;
   }

   // get number of transactions by filter (pending or executed)
   function getTransactionCount(bool _pending, bool _executed)
      public
      view
      returns (uint count)
   {
      for (uint i = 0; i < transactionCount; ++i)
         if (_pending && !transactions[i].executed || _executed && transactions[i].executed)
            count += 1;
   }

   // Return list of transaction IDs in defined range.
   function getTransactionIds(uint _from, uint _to, bool _pending, bool _executed)
      public
      view
      returns (uint[] memory _transactionIds)
   {
      uint[] memory transactionIdsTemp = new uint[](transactionCount);
      uint count = 0;
      uint i;

      for (i = 0; i < transactionCount; i++) {
         if (_pending && !transactions[i].executed || _executed && transactions[i].executed) {
            transactionIdsTemp[count] = i;
            count += 1;
         }
      }
      _transactionIds = new uint[](_to - _from);
      for (i = _from; i < _to; ++i)
         _transactionIds[i - _from] = transactionIdsTemp[i];
   }

   function totalSupply() public view returns (uint256) {
      return MyEasyToken.totalSupply();
   }

   function balanceOf(address _tokenOwner) public view returns (uint256) {
      return MyEasyToken.balanceOf(_tokenOwner);
   }

   function getIsOwner(address _owner) public view returns (bool) {
      return isOwner[_owner];
   }

   function getConfirmations(uint256 _trxId, address _signer) public view returns (bool) {
      return confirmations[_trxId][_signer];
   }

   function getRequiredSigs() public view returns (uint256) {
      return requiredSigs;
   }

   function getTransactions(uint _trxId) public view returns (Transaction memory) {
      return transactions[_trxId];
   }
}