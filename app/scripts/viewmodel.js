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
         updateAddressView(boundDOMElement);
      }
   },

   setName: function (newName) {
      this.newName = newName;
      for (let boundDOMElement of this.bindings.newName) {
         updateAddressView(boundDOMElement);
      }
   },

   setBalance: function (newBalance) {
      this.newBalance = newBalance;
      for (let boundDOMElement of this.bindings.newBalance) {
         updateBalanceView(boundDOMElement);
      }
   },

   updateAddressView: function (DOMElement) {
      DOMElement.innerHtml = this.address;
   },

   updateNameView: function (DOMElement) {
      DOMElement.innerHtml = this.name;
   },

   updateBalanceView: function (DOMElement) {
      DOMElement.innerHtml = this.balance;
   }
};