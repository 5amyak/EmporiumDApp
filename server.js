const express = require('express');
const fs = require('fs');
var cookieParser = require('cookie-parser');
Web3 = require('web3')
const app = express()

var provider = new Web3.providers.HttpProvider("https://ropsten.infura.io/qeABbC4mUO5HEbpvafTw");
var contract = require("truffle-contract");

var Influencers = contract(JSON.parse(fs.readFileSync("build/contracts/Influencers.json")));
Influencers.setProvider(provider);
var Products = contract(JSON.parse(fs.readFileSync("build/contracts/Products.json")));
Products.setProvider(provider);

app.use(cookieParser());
app.get('/', function(req, res) {
	if ("pid" in req.query && "addr" in req.query) {
		console.log(req.query);
		if (!("rememberme" in req.cookies)) {
			Influencers.deployed().then(function(contractInstance) {
				contractInstance.updateCounter(req.query.addr, parseInt(req.query.pid), {gas: 140000, from: '0x82332274c68f16c5f2c718b8b61a965852b59303'}).then(function(v) {
					console.log(v);
					console.log("influencers contract updated.");
				});
			});
		}

		res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000)});
		Products.deployed().then(function(contractInstance) {
			contractInstance.getDetails.call(parseInt(req.query.pid)).then(function(v) {
				let prdLink = v[4];
				console.log(prdLink);
				res.redirect(prdLink);
				res.end();
			});
		});

	}
	else
		res.send('Thank You for using Emporium!');
});
app.listen(3000, () => console.log('Example app listening on port 3000!'))