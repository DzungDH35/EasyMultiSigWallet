const INDEX_URL = '/index.html';
const Metamask = window.ethereum;
const METAMASK_CONNECT_FAILED_MSG = 'Cannot connect to metamask. Please reload the page!';
const METAMASK_ACCOUNT_REQUEST_FAILED_MSG = 'Fail to request for MetaMask accounts!';

function setUpMetaMaskEvent() {
   Metamask.on('disconnect', error => {
      alert(METAMASK_CONNECT_FAILED_MSG);
      console.log(error);
   });

   Metamask.on('accountsChanged', (accounts) => {
      console.log(accounts);
   });

   Metamask.on('chainChanged', (chainId) => {
      console.log('Chain changed with new id = ' + chainId);
      window.location.reload();
   });
}

function setUpViewModel() {
   accountViewModel.setBinding(document.querySelector('.account-address'), 'address');
   accountViewModel.setBinding(document.querySelector('.account-balance'), 'balance');
}

function bootstrap() {
   setUpMetaMaskEvent();
   setUpViewModel();
   Metamask.request({ method: 'eth_requestAccounts' })
      .then(accountAddresses => {
         console.log(accountAddresses);
         accountViewModel.setAddress(accountAddresses[0]);
      })
      .catch(error => {
         console.log(error);
         alert(METAMASK_ACCOUNT_REQUEST_FAILED_MSG);
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