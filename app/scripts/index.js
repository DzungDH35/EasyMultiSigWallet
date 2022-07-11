const METAMASK_UNINSTALLED_MSG = 'Please install extension Metamask first and reload the page!';
const METAMASK_CONNECT_FAILED = 'Failed to connect to MetaMask. Please try again!';
const MSW_URL = "/multisig-wallet.html";
const Metamask = window.ethereum;

document.querySelector('.input-wrapper > input').addEventListener('focus', event => {
   let label = document.querySelector('.input-wrapper > label');
   label.style.top = '-20px';
   label.style.fontSize = '0.8rem';
});

document.querySelector('.input-wrapper > input').addEventListener('focusout', event => {
   if (event.target.value === '') {
      let label = document.querySelector('.input-wrapper > label');
      label.style.top = '0px';
      label.style.fontSize = 'inherit';
   }
});

document.querySelector('.input-wrapper > input').addEventListener('input', event => {
   document.querySelector('#connect-metamask').disabled = event.target.value === '';
});

if (Metamask == undefined || !Metamask.isMetaMask) {
   alert(METAMASK_UNINSTALLED_MSG);
} else {
   document.querySelector('#connect-metamask').addEventListener('click', event => {
      event.target.disabled = true;
      window.sessionStorage.setItem(
         'wallet-contract-address', document.querySelector('.input-wrapper > input').value
      )
   
      Metamask.request({ method: 'eth_requestAccounts' })
         .then(data => {
            console.log(data);
            window.location.replace(MSW_URL);
         })
         .catch(error => {
            console.log(error);
            alert(METAMASK_CONNECT_FAILED);
            event.target.disabled = false;
         })
   });
}