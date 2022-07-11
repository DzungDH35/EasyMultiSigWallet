const METAMASK_UNINSTALLED_MSG = 'Please install extension Metamask first and reload the page!';
const METAMASK_CONNECT_FAILED = 'Failed to connect to MetaMask. Please try again!';
const MSW_URL = "/multisig-wallet.html";
const Metamask = window.ethereum;

if (Metamask == undefined || !Metamask.isMetaMask) {
   alert(METAMASK_UNINSTALLED_MSG);
} else {
   window.ethereum._metamask.isUnlocked()
   .then(isUnlocked => {
      if (isUnlocked) {
         window.location.replace(MSW_URL);
      }
      else {
         document.querySelector('#connect-metamask').addEventListener('click', event => {
            event.target.disabled = true;
            document.querySelector('#connect-metamask').style.opacity = 0.5;
         
            Metamask.request({ method: 'eth_requestAccounts' })
               .then(data => {
                  console.log(data);
                  window.location.replace(MSW_URL);
               })
               .catch(error => {
                  console.log(error);
                  alert(METAMASK_CONNECT_FAILED);
                  event.target.disabled = false;
                  document.querySelector('#connect-metamask').style.opacity = 'unset';
               })
         });
      }
   })
   .catch(error => console.log(error));
}