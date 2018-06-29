// Allows us to use ES6 in our migrations and tests.
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "chaos buzz enroll minor carry rebel off conduct size filter two place";
require('babel-register')

module.exports = {
  networks: {
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/qeABbC4mUO5HEbpvafTw")
      },
      network_id: 3
    }   
  }
};