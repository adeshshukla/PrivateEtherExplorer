//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var fs = require('fs');


//////////////////////////////////////////// DAPP ///////////////////////////////////////
// Read the config.
var serverConfig = require('./serverConfig')

// web3.js library.
Web3 = require("web3");

// Url of Ethereum private network.
var privateNodeUrl = "http://" + serverConfig.ChainIpAddr + ":" + serverConfig.ChainPortNo;
web3 = new Web3(new Web3.providers.HttpProvider(privateNodeUrl));


    // Account List
    // var accounts = web3.eth.accounts;
    // console.log('Accounts List------------')
    // console.log(accounts);

    // // Get balance of first account
    // var balance = web3.eth.getBalance(web3.eth.accounts[0])
    // console.log('Balance of accounts 1 : ' + balance);

    // balance = web3.eth.getBalance(web3.eth.accounts[1])
    // console.log('Balance of accounts 2 : ' + balance);

    // var accountDetails = accounts.map(function(item){
    //     return{
    //         address : item,
    //         balance : web3.eth.getBalance(item)
    //     }
    // });
    // console.log('Account details -----------------------');
    // console.log(accountDetails);


//  var n = web3.eth.blockNumber;
//      // web3.eth.getBlockNumber(function(data){n=data});
//     console.log("Block number : "+ n);
//     var txs = [];
//     for(var i = 0; i < n; i++) {
//         var block = web3.eth.getBlock(i, true);

//         var nt = block.transactions;

//         if(nt.length){
//             console.log("i ----------------> " + i);
//             // console.log(block);

//             console.log('No. of txs : ' + nt);
//         }
//     }


var id = 87;
    var n =  web3.eth.getBlockTransactionCount(id)
    console.log("No of transactions : " + n);
    for(var i=0; i< n; i++){
        var tx = web3.eth.getTransactionFromBlock(id,i);
        console.log(tx);
    }
