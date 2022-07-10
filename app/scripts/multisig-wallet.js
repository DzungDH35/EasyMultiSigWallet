const MSW_ADDRESS = '0xa22c9d019b0fbe54a26fdb92136770a2495bdfc5';
const Metamask = window.ethereum

if (typeof web3 !== 'undefined')
   web3 = new Web3(web3.currentProvider);
else
   web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

if (typeof window.ethereum !== 'undefined') {
   console.log('Metamask is installed');
} else {
   console.log('Please install extension Metamask');
}

// Metamask.request({ method: 'eth_requestAccounts' });

ethereum.on('accountsChanged', function (accounts) {
   console.log('account changed');
});