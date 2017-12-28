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

app.get("/api/getAllBlocks", function(req,res){
    console.log('inside api service method : getAllBlocks()');

    var n = web3.eth.blockNumber;
     // web3.eth.getBlockNumber(function(data){n=data});
    console.log("Block number : "+ n);
    var blocks = [];
    for(var i = 0; i < n; i++) {
        var block = web3.eth.getBlock(i, true);
        // console.log("i ----------------> " + i);
        // console.log(block);
        if(block.transactions.length){
            blocks.push(block);
        }
        // var nt = block.transactions;
        // console.log('No. of txs : ' + nt);
        // for(var j = 0; j < block.transactions; j++) {
        //     console.log("j ----------------> " + j);
        //     console.log(block.transactions[j]);
        //     if( block.transactions[j].to == the_address )
        //         txs.push(block.transactions[j]);
        // }
    }

    // console.log(txs);
    console.log("Returning blocks--------");
    res.send(blocks);
});

app.get("/api/getAllBlocksFromFile", function(req,res){
    console.log('inside api service method : getAllBlocksFromFile()');

    fs.readFile('./Database/Blocks.txt', 'utf8', function(err, contents) {
		if(err) {			
			console.log("ERROR reading txt file!!!");
			//console.log(err);
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
