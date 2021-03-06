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
         document.querySelector('.control-buttons-wrapper').appendChild(
            document.getElementById('control-button--restricted').content.cloneNode(true)
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
      tokenTransferTemplate: document.getElementById('popup-template--token-transfer').content,
      signTransactionTemplate: document.getElementById('popup-tempalte--signTransaction').content,
      addOwnerTemplate: document.getElementById('popup-tempalte--addOwner').content,
      requiredSigsTemplate: document.getElementById('popup-tempalte--changeRequiredSigs').content,
   },
   selector: {
      identifier: 'overlay-container__popup',
      title: '.popup-title',
      close: '.popup-close',
      body: '.popup-body',
      input: '.popup-field-input',
      submit: '.popup-submit-trx',
      from: '.popup-field__content--from',
      signer: '.popup-field__content--signer',
      owner: '.popup-field__content--owner'
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
         this.setTitle('Transfer Tokens');
         document.querySelector(this.selector.body).appendChild(this.data.tokenTransferTemplate.cloneNode(true));
         document.querySelector(this.selector.from).innerHTML = config.transferFrom;

         let transferTo = document.querySelectorAll(this.selector.input)[0],
             tokens = document.querySelectorAll(this.selector.input)[1];

         for (let input of document.querySelectorAll(this.selector.input)) {
            input.addEventListener('input', event => {
               document.querySelector(this.selector.submit).disabled = transferTo.value === '' || tokens.value === '';
            });
         }
      } else if (config.type === 'signTransaction') {
         this.setTitle('Sign Transaction');
         document.querySelector(this.selector.body).appendChild(this.data.signTransactionTemplate.cloneNode(true));
         document.querySelector(this.selector.signer).innerHTML = config.signer;
         document.querySelector(this.selector.input).addEventListener('input', event => {
            document.querySelector(this.selector.submit).disabled = event.currentTarget.value === '';
         });
      } else if (config.type === 'addOwner') {
         this.setTitle('Add New Wallet Owner');
         document.querySelector(this.selector.body).appendChild(this.data.addOwnerTemplate.cloneNode(true));
         document.querySelector(this.selector.owner).innerHTML = config.owner;
         document.querySelector(this.selector.input).addEventListener('input', event => {
            document.querySelector(this.selector.submit).disabled = event.currentTarget.value === '';
         });
      } else if (config.type === 'changeRequiredSigs') {
         this.setTitle('Change Required Signatures');
         document.querySelector(this.selector.body).appendChild(this.data.requiredSigsTemplate.cloneNode(true));
         document.querySelector(this.selector.owner).innerHTML = config.owner;
         document.querySelector(this.selector.input).addEventListener('input', event => {
            document.querySelector(this.selector.submit).disabled = event.currentTarget.value === '';
         });
      }
   },

   destroy: function () {
      document.getElementById(this.selector.identifier).remove();
      this.wrapper.style.zIndex = -1;
   }
};

let trxViewModel = {
   trx: [],
   requiredSigs: 0,
   itemTemplate: document.getElementById('record-item').content,
   recordContentSelector: '.record-content-wrapper',
   proposerSelector: '.record-item-proposer > :nth-child(2)',
   receiptSelector: '.record-item-receipt > :nth-child(2)',
   statusSelector: '.record-item-status > img',
   completeIconSrc: './assets/complete.png',
   pendingIconSrc: './assets/pending.png',
   trxIdSelector: '.record-item-trxId > :nth-child(2)',
   tokenSelector: '.record-item-token-wrapper > :nth-child(2)',
   currentConfirmSelector: '.record-item-current-confirm',
   requiredSigSelector: '.record-item-required-sigs',
   recordItem: '.record-item',

   renderRecordItem: function() {
      let itemNode = this.itemTemplate.cloneNode(true),
         wrapper = document.querySelector(this.recordContentSelector)
         j = 0;

      for (let i = 0; i < this.trx.length; ++i) {
         wrapper.appendChild(itemNode);
         document.querySelectorAll(this.trxIdSelector)[i].innerHTML = i;
         document.querySelectorAll(this.proposerSelector)[i].innerHTML = this.trx[i].proposer;
         document.querySelectorAll(this.receiptSelector)[i].innerHTML = this.trx[i].destination;
         document.querySelectorAll(this.statusSelector)[i].src = this.trx[i].executed ? this.completeIconSrc : this.pendingIconSrc;
         document.querySelectorAll(this.tokenSelector)[i].innerHTML = this.trx[i].value + ' ' + walletViewModel.tokenSymbol;

         if (this.trx[i].executed) {
            document.querySelectorAll(this.recordItem)[i].classList.add('record-item-executed');
         }
      }
   },

   setConfirmCount: function (confirmCount, trxId) {
      this.trx[trxId].confirmCount = confirmCount;
      document.querySelectorAll(this.currentConfirmSelector)[trxId].innerHTML = confirmCount;
      document.querySelectorAll(this.requiredSigSelector)[trxId].innerHTML = this.requiredSigs;
   },

   setRequiredSigs: function (requiredSigs) {
      this.requiredSigs = requiredSigs;
   }
};