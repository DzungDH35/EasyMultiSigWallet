// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "../interfaces/IERC20.sol";

contract EasyToken is IERC20 {
   string private constant NOT_ENOUGH_BALANCE_MSG = "Balance is not enough!";
   string private constant NOT_ENOUGH_ALLOWANCE_MSG = "Allowance is not enough!";

   string public constant name = "EasyToken";
   string public constant symbol = "EZT";
   uint256 private _totalSupply;

   mapping(address => uint256) balances;
   mapping(address => mapping (address => uint256)) allowed;

   constructor(uint256 _supply) {
      _totalSupply = _supply;
      balances[msg.sender] = _totalSupply;
   }

   modifier balanceSuffices(address _owner, uint256 _token) {
      require(balances[_owner] >= _token, NOT_ENOUGH_BALANCE_MSG);
      _;
   }

   modifier allowanceSuffices(address _owner, uint256 _token) {
      require(allowed[_owner][msg.sender] >= _token, NOT_ENOUGH_ALLOWANCE_MSG);
      _;
   }

   function totalSupply() public override view returns (uint256) {
      return _totalSupply;
   }

   function balanceOf(address _tokenOwner) public override view returns (uint256) {
      return balances[_tokenOwner];
   }

   function allowance(address _owner, address _delegate) public override view returns (uint256) {
      return allowed[_owner][_delegate];
   }

   function transfer(address _receiver, uint256 _token) 
      public 
      override
      balanceSuffices(msg.sender, _token)
      returns (bool) 
   {
      balances[msg.sender] -= _token;
      balances[_receiver] += _token;
      emit Transfer(msg.sender, _receiver, _token);
      return true;
   }

   function transferFrom(address _owner, address _receiver, uint256 _token)
      public 
      override
      balanceSuffices(_owner, _token)
      allowanceSuffices(msg.sender, _token)
      returns (bool)
   {
      balances[_owner] -= _token;
      allowed[_owner][msg.sender] -= _token;
      balances[_receiver] += _token;
      emit Transfer(_owner, _receiver, _token);
      return true;
   }

   function approve(address _delegate, uint256 _token) 
      public 
      override
      returns (bool) 
   {
      allowed[msg.sender][_delegate] = _token;
      emit Approval(msg.sender, _delegate, _token);
      return true;
   }
}