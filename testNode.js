//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var app = express(); 
var fs = require('fs');


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
  
 var n = web3.eth.blockNumber;
     // web3.eth.getBlockNumber(function(data){n=data});
    console.log("Block number : "+ n);
    var txs = [];
    for(var i = 0; i < n; i++) {
        var block = web3.eth.getBlock(i, true);

        var nt = block.transactions;
        
        if(nt.length){
            console.log("i ----------------> " + i);
            // console.log(block);
            
            console.log('No. of txs : ' + nt);
        }
        // for(var j = 0; j < block.transactions; j++) {
        //     console.log("j ----------------> " + j);
        //     console.log(block.transactions[j]);
        //     if( block.transactions[j].to == the_address )
        //         txs.push(block.transactions[j]);
        // }
    }
    

