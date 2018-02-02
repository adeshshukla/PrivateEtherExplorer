//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var fs = require('fs');

// Body Parser Middleware
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//////////////////////////////////////////// DAPP ///////////////////////////////////////
// Read the config.
var serverConfig = require('./serverConfig')

// web3.js library.
Web3 = require("web3");

// Url of Ethereum private network.
var privateNodeUrl = "http://" + serverConfig.ChainIpAddr + ":" + serverConfig.ChainPortNo;
web3 = new Web3(new Web3.providers.HttpProvider(privateNodeUrl));

// ----------------------------------------------------- API ----------------------------------------------------- //
app.get("/api/getChainOverview", function (req, res) {
    console.log('inside api service method : getlatestBlock()');
    var chainOverview = {};
    var gasPrice, hashRate;


    web3.eth.getGasPrice((err, price) => {
        chainOverview['gasPrice'] = price;
        web3.eth.getHashrate((err, rate) => {
            chainOverview['hashRate'] = rate;
            chainOverview['lastBlock'] = web3.eth.blockNumber;

            console.log('chain overview---')
            console.log(chainOverview);
            res.send(chainOverview);
        });
    });


});

app.get("/api/getAllAccountDetails", function (req, res) {
    console.log('inside api service method : getAllAccountDetails()');
    // Account List
    var accounts = web3.eth.accounts;
    var accountDetails = accounts.map(function (item) {
        return {
            address: item,
            balance: web3.fromWei(web3.eth.getBalance(item))
        }
    });

    res.send(accountDetails);
});

app.get("/api/getAllBlocks", function (req, res) {
    console.log('inside api service method : getAllBlocks()');

    var n = web3.eth.blockNumber;
    // web3.eth.getBlockNumber(function(data){n=data});
    // console.log("Block number : "+ n);

    var blocks = [];
    for (var i = 0; i < n; i++) {
        var block = web3.eth.getBlock(i, true);
        if (block.transactions.length) {
            blocks.push(block);
        }
    }

    console.log("Returning blocks--------");
    res.send(blocks);
});

app.get("/api/getAllBlocksFromFile", function (req, res) {
    console.log('inside api service method : getAllBlocksFromFile()');

    fs.readFile('./Database/Blocks.txt', 'utf8', function (err, contents) {
        if (err) {
            console.log("ERROR reading txt file!!!");
            res.send(err);
        }
        else {
            // console.log('--------- String Content from TXT file ---------');
            // console.log(contents);
            var jsonObj = JSON.parse(contents);
            // console.log('--------- JSON Content from TXT file ---------');
            // console.log(jsonObj);
            // jsonObj.forEach(function(element) {
            // 	console.log(element.firstName + ' ' + element.lastName);
            // }, this);

            // send data to front end
            console.log("Returning blocks from TXT File --------");
            res.send(jsonObj);
        }
    });
});

app.get("/api/getTransactionsFromBlock/:id", function (req, res) {
    console.log('inside api service method : getTransactionsFromBlock() : param : ' + req.params.id);
    var id = req.params.id;
    var txs = [];
    var tx;

    var n = web3.eth.getBlockTransactionCount(id)
    for (var i = 0; i < n; i++) {
        tx = web3.eth.getTransactionFromBlock(id, i);
        tx["value"] = web3.fromWei(tx["value"]);
        txs.push(tx);
    }

    res.send(txs);
});

app.get("/api/getBlock/:addr", function (req, res) {
    console.log('inside api service method : getBlock() : param : ' + req.params.addr);
    var block = web3.eth.getBlock(req.params.addr);
    res.send(block);
});





app.post("/api/saveVote", function (req, res) {
    console.log('inside api service method : saveVote');
    console.log(req.body);
    res.send("ok");
});

//////////////////////////////////////////// DAPP ///////////////////////////////////////

var server = app.listen(process.env.PORT || serverConfig.WebPortNo, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});
