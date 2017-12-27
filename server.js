//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var app = express(); 
var fs = require('fs');

// Body Parser Middleware
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
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
    // web3.js
    Web3 = require("web3");

    // 	geth --identity "Node248" --networkid 888 --rpc --rpcport "8081" --datadir "./chaindata/" --port "30330" --nodiscover --rpcapi "db,eth,net,web3"
    // 8081 - rpc port of private chain
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8081"));

    /*
    // Account List
    var accounts = web3.eth.accounts;
    console.log('Accounts List------------')
    console.log(accounts);

    // Get balance of first account
    var balance = web3.eth.getBalance(web3.eth.accounts[0])
    console.log('Balance of accounts 1 : ' + balance);

    balance = web3.eth.getBalance(web3.eth.accounts[1])
    console.log('Balance of accounts 2 : ' + balance);

    var accountDetails = accounts.map(function(item){
        return{
            address : item,
            balance : web3.eth.getBalance(item)
        }
    });
    console.log('Account details -----------------------');
    console.log(accountDetails);
    */
    
// ----------------------------------------------------- API ----------------------------------------------------- //
app.get("/api/getAllAccountDetails", function(req , res){
    console.log('inside api service method : getAllAccountDetails()');
    // Account List
    var accounts = web3.eth.accounts;
    // console.log('Accounts List------------')
    // console.log(accounts);

    // Get balance of first account
    // var balance = web3.eth.getBalance(web3.eth.accounts[0])
    // console.log('Balance of accounts 1 : ' + balance);

    // balance = web3.eth.getBalance(web3.eth.accounts[1])
    // console.log('Balance of accounts 2 : ' + balance);

    var accountDetails = accounts.map(function(item){
        return{
            address : item,
            balance : web3.fromWei(web3.eth.getBalance(item))
        }
    });
    // console.log('Account details -----------------------');
    // console.log(accountDetails);

    res.send(accountDetails);
});

app.get("/api/getAllTransactions", function(req,res){
    console.log('inside api service method : getAllTransactions()');
});

 app.post("/api/saveVote", function(req , res){
    console.log('inside api service method : saveVote');
    console.log(req.body);
    res.send("ok");
});

//////////////////////////////////////////// DAPP ///////////////////////////////////////

 var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;    
    console.log("App now running on port", port);
 });
