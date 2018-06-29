var Users = artifacts.require("Users");

module.exports = function(deployer) {
  deployer.deploy(Users, web3.toWei('0.01', 'ether'));
};
