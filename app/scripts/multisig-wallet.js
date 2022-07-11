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

			mswContract.methods.getIsOwner(accountViewModel.address).call((err, isWalletOwner) => {
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