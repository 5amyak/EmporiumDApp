// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

/*
 * When you compile and deploy your Users contract,
 * truffle stores the abi and deployed address in a json
 * file in the build directory. We will use this information
 * to setup a Users abstraction. We will use this abstraction
 * later to create an instance of the Users contract.
 * Compare this against the index.js from our previous tutorial to see the difference
 * https://gist.github.com/maheshmurthy/f6e96d6b3fff4cd4fa7f892de8a1a1b4#file-index-js
 */

 import users_artifacts from '../../build/contracts/Users.json'
 import products_artifacts from '../../build/contracts/Products.json'
 import influencers_artifacts from '../../build/contracts/Influencers.json'

 var Users = contract(users_artifacts);
 var Products = contract(products_artifacts);
 var Influencers = contract(influencers_artifacts);

 let tokenPrice = null;

/* The user enters the total no. of tokens to buy. We calculate the total cost and send it in
 * the request. We have to send the value in Wei. So, we use the toWei helper method to convert
 * from Ether to Wei.
 */

 window.buyTokens = function() {
  let tokensToBuy = $("#buy").val();
  if (tokensToBuy <= 0) {
    alert("Buy Valid tokens");
    return;
  }
  let price = tokensToBuy * tokenPrice;
  $("#buy-msg").html("Purchase order has been submitted. Please wait.");
  $("#buy").val("");
  Users.deployed().then(function(contractInstance) {
    contractInstance.buy({value: web3.toWei(price, 'ether'), from: web3.eth.accounts[0]}).then(function(v) {
      console.log(v);
      $("#buy-msg").html("");
      populateTokenData();
    })
  });
}

window.addProduct = function() {
  let prdDescr = $("#prdDescr").val();
  let prdImgLink = $("#prdImgLink").val();
  let prdTitle = $("#prdTitle").val();
  let prdLink = $("#prdLink").val();
  let prdInfluencePrice = parseInt($("#prdInfluencePrice").val());
  let prdInfluenceNum = parseInt($("#prdInfluenceNum").val());

  let tokensToAdv = prdInfluencePrice * prdInfluenceNum;
  console.log("tokensToAdv " + tokensToAdv);

  // Users.deployed().then(function(contractInstance) {
  //   contractInstance.getHolderTokens.call().then(function(v) {
  //     console.log("Holder of "+ web3.eth.accounts[0] +" has Tokens: " + v.toNumber());
  //     if (v >= tokensToAdv) {

  //     }
  //   });
  // });

  // Users.deployed().then(function(contractInstance) {
    // console.log(contractInstance.address);
    // contractInstance.useHolderTokens(tokensToAdv).then(function(v2) {
      // console.log("Tokens of owned updated.");
    // });
  // });

  Products.deployed().then(function(contractInstance) {
    contractInstance.addProduct(prdDescr, prdImgLink, prdTitle, prdLink, prdInfluencePrice, prdInfluenceNum, {from: web3.eth.accounts[0]}).then(function(v) {
      console.log(v);
      console.log(prdDescr +  " " + prdImgLink +  " " + prdInfluencePrice + " " + prdInfluenceNum);
      alert("Product added");
      lookupProductInfo();
    });
  });

  $("#prdDescr").val("");
  $("#prdImgLink").val("");
  $("#prdTitle").val("");
  $("#prdLink").val("");
  $("#prdInfluencePrice").val("");
  $("#prdInfluenceNum").val("");
}

window.lookupProductInfo = function() {
  let totProducts;
  Products.deployed().then(function(contractInstance) {
    contractInstance.totProducts().then(function(v) {
      totProducts = v.toNumber();
      console.log("Total Products so far are: " + totProducts);
      var productHTML = "";
      $("#products").html("");
      for (var i = 1; i <= totProducts; i++) {
        contractInstance.getDetails.call(i).then(function(v) {
          console.log(v);
          let prdInfluencePrice = v[1];
          let prdImgLink = v[2];
          let prdDescr = v[3];
          let prdLink = v[4];
          let prdTitle = v[5];
          let prdInfluenceNum = v[6];
          let shareURL = 'http://localhost:3000/?addr='+ web3.eth.accounts[0] + '%26pid=' + totProducts;
          prdLink = 'http://localhost:3000/?addr='+ web3.eth.accounts[0] + '&pid=' + totProducts;
          // shareURL = encodeURI(shareURL);

          var productHTML = '<a href="'+ prdLink  +'"><div class="col-sm-4" style="padding-left:50px; padding-right: 50px;">\
          <div class="card" style="width: 20rem;">\
          <center><img style="width:200px; height:300px;" class="card-img-top" src="'+ prdImgLink +'" alt="Card image cap"></center>\
          <div class="card-body">\
          <h5 class="card-title">'+ prdTitle +'</h5>\
          <p class="card-text">'+ prdDescr +'</p>\
          <a target="_blank" href="https://twitter.com/intent/tweet?text='+ prdDescr +'&hashtags=Emporium&url='+ shareURL +'" class="btn btn-primary">Share on Twitter</a></div></div></div></a>';
          var tmp = $("#products").html();
          // console.log(tmp);
          tmp += productHTML;
          $("#products").html(tmp);
        });
      }
    });
  });
}

/* Fetch the total tokens, tokens available for sale and the price of
 * each token and display in the UI
 */
 function populateTokenData() {
  Users.deployed().then(function(contractInstance) {
    contractInstance.tokenPrice().then(function(v) {
      tokenPrice = parseFloat(web3.fromWei(v.toString()));
      $("#token-cost").html(tokenPrice + " Ether");
    });
    web3.eth.getBalance(contractInstance.address, function(error, result) {
      $("#contract-balance").html(web3.fromWei(result.toString()) + " Ether");
    });
  });
}

$(document).ready(function() {
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source like Metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  Users.setProvider(web3.currentProvider);
  Products.setProvider(web3.currentProvider);
  Influencers.setProvider(web3.currentProvider);

  populateTokenData();
  lookupProductInfo();
});