/**
 * Only use api `set` to interact with this object
 */
let accountViewModel = {
   address: '0x0000000000000000000000000000000000000000',
   name: '',
   balance: 0,
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
      for (let boundDOMElement of this.bindings.newName) {
         this.updateAddressView(boundDOMElement);
      }
   },

   setBalance: function (newBalance) {
      this.newBalance = newBalance;
      for (let boundDOMElement of this.bindings.newBalance) {
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
      DOMElement.innerHTML  = this.balance;
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