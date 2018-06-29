var Influencers = artifacts.require("Influencers");
var Products = artifacts.require("Products");

module.exports = function(deployer) {
  deployer.deploy(Products).then(function(){
  	deployer.deploy(Influencers, Products.address);
  });
};
