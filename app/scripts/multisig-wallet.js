const INDEX_URL = '/index.html';
const Metamask = window.ethereum;
const METAMASK_CONNECT_FAILED_MSG = 'Cannot connect to metamask. Please reload the page!';

if (typeof web3 !== 'undefined')
   web3 = new Web3(web3.currentProvider);
else
   web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

if (Metamask == undefined || !Metamask.isMetaMask) {
   window.localtion.replace(INDEX_URL);
} else {
   window.ethereum._metamask.isUnlocked()
      .then(isUnlocked => {
         if (!isUnlocked) {
            window.localtion.replace(INDEX_URL);
         } else
            bootstrap();
      })
}

function setUpMetaMaskEvent() {
   window.ethereum.on('disconnect', error => {
      alert(METAMASK_CONNECT_FAILED_MSG);
      console.log(error);
   });

   window.ethereum.on('accountsChanged', (accounts) => {
      console.log(accounts);
   });

   ethereum.on('chainChanged', (chainId) => {
      console.log('Chain changed with new id = ' + chainId);
      window.location.reload();
   });

}

function bootstrap() {
   setUpMetaMaskEvent();
}
