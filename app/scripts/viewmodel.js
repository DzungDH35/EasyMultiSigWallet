/**
 * Only use api `set` to interact with this object
 */
let accountViewModel = {
   address: '0x0000000000000000000000000000000000000000',
   name: '',
   balance: 0,
   tokenName: '',
   bindings: {
      address: [],
      name: [],
      balance: []
   },

   setBinding: function (DOMElement, type) {
      if (type === 'address') {
         this.bindings.address.push(DOMElement);
      } else if (type === 'name') {
         this.bindings.name.push(DOMElement);
      } else if (type === 'balance') {
         this.bindings.balance.push(DOMElement);
      }
   },

   setAddress: function (newAddress) {
      this.address = newAddress;
      for (let boundDOMElement of this.bindings.address) {
         this.updateAddressView(boundDOMElement);
      }
   },

   setName: function (newName) {
      this.newName = newName;
      for (let boundDOMElement of this.bindings.name) {
         this.updateAddressView(boundDOMElement);
      }
   },

   setBalance: function (newBalance) {
      this.balance = newBalance;
      for (let boundDOMElement of this.bindings.balance) {
         this.updateBalanceView(boundDOMElement);
      }
   },

   setTokenName: function (newTokenName) {
      this.tokenName = newTokenName;
      for (let boundDOMElement of this.bindings.balance) {
         this.updateBalanceView(boundDOMElement);
      }
   },

   updateAddressView: function (DOMElement) {
      DOMElement.innerHTML  = this.address;
   },

   updateNameView: function (DOMElement) {
      DOMElement.innerHTML  = this.name;
   },

   updateBalanceView: function (DOMElement) {
      DOMElement.innerHTML  = this.balance + ' ' + this.tokenName;
   }
};

let recordViewModel = {
   activity: {

   },
   pendingTrx: {

   }
};

let recordTabs = {
   tabGroupWrapperClass: 'record-tab-wrapper',
   tabGroupClass: 'record-tab-group',
   tabContentWrapperClass: 'record-content-wrapper',
   tabClass: 'record-tab',
   activeTabClass: 'record-tab--active',
   currentActiveTab: null,

   activateTab: function (DOMElement) {
      this.currentActiveTab.classList.remove(this.activeTabClass);
      this.currentActiveTab = DOMElement;
      this.currentActiveTab.classList.add(this.activeTabClass);
   },

   setDefaultActiveTab: function (DOMElement) {
      this.currentActiveTab = DOMElement;
      this.currentActiveTab.classList.add(this.activeTabClass);
   },

   init: function () {
      let self = this;

      for (let tabGroupWrapper of document.getElementsByClassName(this.tabGroupWrapperClass)) {
         tabGroupWrapper.children[0].classList.add(self.tabGroupClass);
         
         for (let tab of tabGroupWrapper.children[0].children) {
            tab.classList.add(self.tabClass);
            tab.addEventListener('click', event => self.activateTab(event.currentTarget));
         }
         tabGroupWrapper.children[1].classList.add(self.tabContentWrapperClass);
      }

      this.setDefaultActiveTab(document.getElementsByClassName(this.tabClass)[0]);
   }
};

let chainNetworkViewModel = {
   chainId: 0,
   name: {
      1: 'Ethereum Mainnet',
      3: 'Ropsten Test Network',
      4: 'Rinkeby Test Network',
      5: 'Goerli Test Network',
      42: 'Kovan Test Network'
   },
   bgColor: {
      1: '#29b6af',
      3: '#ff4a8d',
      4: '#f6c343',
      5: '#3099f2',
      42: '#9064ff'
   },

   setChainId: function (newChainHexId) {
      this.chainId = parseInt(newChainHexId.toString(16), 16);
      document.querySelector('.chain-symbol').style.backgroundColor = this.bgColor[this.chainId];
      document.querySelector('.chain-name').innerHTML = this.name[this.chainId]
   }
};