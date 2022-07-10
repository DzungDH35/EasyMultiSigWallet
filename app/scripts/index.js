const MSW_ADDRESS = '0xa22c9d019b0fbe54a26fdb92136770a2495bdfc5';
const Metamask = window.ethereum

if (typeof web3 !== 'undefined')
   web3 = new Web3(web3.currentProvider);
else
   web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

if (typeof window.ethereum === 'undefined' || !window.ethereum.isMetaMask) {
   alert('Please install extension Metamask to proceed!');
}

document.querySelector('#connect-metamask').addEventListener('click', (event) => {
   event.target.disabled = true;

   Metamask.request({ method: 'eth_requestAccounts' })
      .then(data => {
         console.log(data);
      })
      .catch(error => {
         alert('Failed to connect to MetaMask. Try again!');
         console.log(error);
      })
      .finally(() => event.target.disabled = false);
});

// ethereum.on('accountsChanged', function (accounts) {
//    console.log('account changed');
// });