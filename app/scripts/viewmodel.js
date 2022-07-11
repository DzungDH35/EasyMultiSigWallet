/**
 * Only use api `set` to interact with this object
 */
let accountViewModel = {
   address: '0x0000000000000000000000000000000000000000',
   name: '',
   balance: 0,
   tokenName: '',
   isWalletOwner: false,
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

   setIsWalletOwner: function (isWalletOwner) {
      this.isWalletOwner = isWalletOwner;

      if (isWalletOwner) {
         document.querySelector('.account-name-wrapper').insertAdjacentHTML(
            'beforeend',
            '<img src="./assets/ownership.png" alt="Wallet Owner">'
         );
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

let walletViewModel = {
   address: '',
   tokenBalance: 0,
   tokenName: '',
   tokenSymbol: '',
   bindings: {
      tokenBalance: [],
      address: []
   },
   
   setBindings: function (DOMElement, type) {
      if (type === 'tokenBalance') {
         this.bindings.tokenBalance.push(DOMElement);
      } else if (type === 'address') {
         this.bindings.address.push(DOMElement);
      }
   },

   setTokenBalance: function (tokenBalance) {
      this.tokenBalance = tokenBalance;
      this.updateTokenBalanceView();
   },

   updateTokenBalanceView: function () {
      for (let boundDOMElement of this.bindings.tokenBalance) {
         boundDOMElement.innerHTML = this.tokenBalance + ' ' + this.tokenName;
      }
   },

   setTokenName: function (name) {
      this.tokenName = name;
      this.updateTokenBalanceView();
   },

   setTokenSymbol: function (symbol) {
      this.tokenSymbol = symbol;
   },

   setAddress: function (address) {
      this.address = address
      this.updateAddressView();
   },

   updateAddressView: function () {
      for (let boundDOMElement of this.bindings.address) {
         boundDOMElement.innerHTML = this.address;
      }
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

let popUpViewModel = {
   data: {
      title: '',
      popupTemplate: document.getElementById('popup-template').content,
      tokenTransferTemplate: document.getElementById('popup-template--token-transfer').content
   },
   selector: {
      identifier: 'overlay-container__popup',
      title: '.popup-title',
      close: '.popup-close',
      body: '.popup-body',
      input: '.popup-field-input',
      submit: '.popup-submit-trx',
      from: '.popup-field__content--from'
   },
   wrapper: null,

   setTitle: function (title) {
      this.title = title;
      document.querySelector(this.selector.title).innerHTML = title;
   },

   init: function (config) {
      let self = this;

      this.wrapper = config.wrapper;
      this.wrapper.style.zIndex = 10;
      this.wrapper.appendChild(this.data.popupTemplate.cloneNode(true));
      document.querySelector(this.selector.close).addEventListener('click', event => {
         self.destroy();
      });

      if (config.type === 'tokenTransfer') {
         this.setTitle('Transfer tokens');
         document.querySelector(this.selector.body).appendChild(this.data.tokenTransferTemplate.cloneNode(true));
         document.querySelector(this.selector.from).innerHTML = config.transferFrom;

         let transferTo = document.querySelectorAll(this.selector.input)[0],
             tokens = document.querySelectorAll(this.selector.input)[1];

         for (let input of document.querySelectorAll(this.selector.input)) {
            input.addEventListener('input', event => {
               document.querySelector(this.selector.submit).disabled = transferTo.value === '' || tokens.value === '';
            });
         }
      }
   },

   destroy: function () {
      document.getElementById(this.selector.identifier).remove();
      this.wrapper.style.zIndex = -1;
   }
};