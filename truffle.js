// Allows us to use ES6 in our migrations and tests.
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = '<hdwallet mnemonic placeholder>';
require('babel-register')

module.exports = {
  networks: {
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/<infura api-key>")
      },
      network_id: 3
    }   
  }
};
