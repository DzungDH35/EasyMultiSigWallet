const INDEX_URL = '/index.html';
const MSW_CONTRACT_ADDR = window.sessionStorage.getItem('wallet-contract-address');

if (MSW_CONTRACT_ADDR == undefined)
	window.location.replace(INDEX_URL)
else {
	walletViewModel.setAddress(MSW_CONTRACT_ADDR);
}
	
const MSW_CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "_owners",
				"type": "address[]"
			},
			{
				"internalType": "uint256",
				"name": "_requiredSigs",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_sender",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_transactionId",
				"type": "uint256"
			}
		],
		"name": "Confirmation",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Deposit",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_transactionId",
				"type": "uint256"
			}
		],
		"name": "Execution",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_transactionId",
				"type": "uint256"
			}
		],
		"name": "ExecutionFailure",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "OwnerAddition",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "OwnerRemoval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_sender",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_transactionId",
				"type": "uint256"
			}
		],
		"name": "Revocation",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_requiredSigs",
				"type": "uint256"
			}
		],
		"name": "SigRequirementChange",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_transactionId",
				"type": "uint256"
			}
		],
		"name": "Submission",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [],
		"name": "MAX_OWNER_COUNT",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "addOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenOwner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_requiredSigs",
				"type": "uint256"
			}
		],
		"name": "changeRequirement",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_transactionId",
				"type": "uint256"
			}
		],
		"name": "confirmTransaction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "confirmations",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_transactionId",
				"type": "uint256"
			}
		],
		"name": "getConfirmationCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "count",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_trxId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_signer",
				"type": "address"
			}
		],
		"name": "getConfirmations",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getIsOwner",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRequiredSigs",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_pending",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "_executed",
				"type": "bool"
			}
		],
		"name": "getTransactionCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "count",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_from",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_to",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_pending",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "_executed",
				"type": "bool"
			}
		],
		"name": "getTransactionIds",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "_transactionIds",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_trxId",
				"type": "uint256"
			}
		],
		"name": "getTransactions",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "proposer",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "destination",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "value",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "executed",
						"type": "bool"
					}
				],
				"internalType": "struct MultiSigWallet.Transaction",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_transactionId",
				"type": "uint256"
			}
		],
		"name": "isConfirmed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isOwner",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "owners",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "removeOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "replaceOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "requiredSigs",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_transactionId",
				"type": "uint256"
			}
		],
		"name": "revokeTransaction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_destination",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "submitTransaction",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_transactionId",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "transactionCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "transactions",
		"outputs": [
			{
				"internalType": "address",
				"name": "proposer",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "destination",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "executed",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
];
const TOKEN_CONTRACT_ADDR = '0x743b3b2Ef3e37D4f9B929046aAd63273D6987A91';
const TOKEN_CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_supply",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_delegate",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_delegate",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_token",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenOwner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTokenOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "setTokenOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_token",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_token",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

let mswContract = null;
const Metamask = window.ethereum;
const METAMASK_CONNECT_FAILED_MSG = 'Cannot connect to metamask. Please reload the page!';
const METAMASK_ACCOUNT_REQUEST_FAILED_MSG = 'Fail to request for MetaMask accounts!';
const WALLET_LOG_OUT_CONFIRM_MSG = 'Are you sure you want to log out of your wallet?';

function setUpMetaMaskEvent() {
   Metamask.on('disconnect', error => {
      alert(METAMASK_CONNECT_FAILED_MSG);
      console.log(error);
   });

   Metamask.on('accountsChanged', (accountAddresses) => {
		if (accountAddresses.length === 0) {
			window.location.replace(INDEX_URL);
		} else {
			window.location.reload();
		}
   });

	Metamask.request({ method: 'eth_requestAccounts' })
      .then(accountAddresses => {
         accountViewModel.setAddress(accountAddresses[0]);

			mswContract.methods.balanceOf(accountViewModel.address).call((err, tokenBalance) => {
				accountViewModel.setBalance(tokenBalance);
			});

			mswContract.methods.isOwner(accountViewModel.address).call((err, isWalletOwner) => {
				accountViewModel.setIsWalletOwner(isWalletOwner);
			});
      })
      .catch(error => {
         console.log(error);
         alert(METAMASK_ACCOUNT_REQUEST_FAILED_MSG);
      });

	ethereum.request({ method: 'eth_chainId' })
		.then(chainHexId => {
			chainNetworkViewModel.setChainId(chainHexId);
		});
	
   Metamask.on('chainChanged', (chainId) => {
      window.location.reload();
   });
}

function setUpViewModel() {
   accountViewModel.setBinding(document.querySelector('.account-address'), 'address');
   accountViewModel.setBinding(document.querySelector('.account-balance'), 'balance');
	walletViewModel.setBindings(document.querySelector('.wallet-balance'), 'tokenBalance');
	walletViewModel.setBindings(document.querySelector('.wallet-address'), 'address');
	recordTabs.init();
}

function bootstrap() {
   mswContract = new web3.eth.Contract(MSW_CONTRACT_ABI, MSW_CONTRACT_ADDR);
   eztContract = new web3.eth.Contract(TOKEN_CONTRACT_ABI, TOKEN_CONTRACT_ADDR);

   setUpViewModel();
   setUpMetaMaskEvent();

	walletViewModel.setAddress(MSW_CONTRACT_ADDR);

	mswContract.methods.balanceOf(MSW_CONTRACT_ADDR).call((err, tokenBalance) => {
		walletViewModel.setTokenBalance(tokenBalance);
	});

	eztContract.methods.name().call((err, name) => {
		walletViewModel.setTokenName(name);
		accountViewModel.setTokenName(name);
	});

	eztContract.methods.symbol().call((err, symbol) => {
		walletViewModel.setTokenSymbol(symbol);
	});

   document.getElementById('log-out-wallet').addEventListener('click', event => {
		if (confirm(WALLET_LOG_OUT_CONFIRM_MSG)) {
			window.sessionStorage.clear();
			window.location.replace(INDEX_URL);
		}
	});

	document.getElementById('account-menu-bar').addEventListener('click', event => {
		let isFlexDisplay = document.querySelector("#account-menu-bar").nextElementSibling.style.display === 'flex';
		let viewControl = isFlexDisplay ? 'up' : 'down';
		document.querySelector('.account-view-control > i').classList.value = 'arrow' + ' ' + viewControl;
		document.querySelector('.account-balance-wrapper').style.display = isFlexDisplay ? 'none' : 'flex';
	});

	document.getElementById('send-tokens').addEventListener('click', event => {
		popUpViewModel.init({
			type: 'tokenTransfer',
			transferFrom: accountViewModel.address,
			wrapper: document.querySelector('.overlay-container')
		});

		document.querySelector('.popup-submit-trx').addEventListener('click', event => {
			let sender = document.querySelector('.popup-field__content--from').innerHTML,
				receipt = document.querySelectorAll('.popup-field-input')[0].value,
				tokens = document.querySelectorAll('.popup-field-input')[1].value;

			console.log(sender, receipt, tokens);

			mswContract.methods
				.submitTransaction(receipt, tokens)
				.send({ from: sender }, function (err, data) {
					console.log(data);
			});
		});
	});
}

if (typeof web3 !== 'undefined')
   web3 = new Web3(web3.currentProvider);
else
   web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

if (Metamask == undefined || !Metamask.isMetaMask) {
   window.localtion.replace(INDEX_URL);
} else {
   Metamask._metamask.isUnlocked()
      .then(isUnlocked => {
         if (!isUnlocked) {
            window.localtion.replace(INDEX_URL);
         } else
            bootstrap();
      })
}