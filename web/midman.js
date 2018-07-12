var Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

var coinbase = web3.eth.coinbase;

var abi=[
	{
		"constant": false,
		"inputs": [
			{
				"name": "idd",
				"type": "uint256"
			},
			{
				"name": "otime",
				"type": "string"
			}
		],
		"name": "addot",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "idd",
				"type": "uint256"
			},
			{
				"name": "locn",
				"type": "string"
			},
			{
				"name": "nam",
				"type": "string"
			},
			{
				"name": "itim",
				"type": "string"
			}
		],
		"name": "addp",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "idd",
				"type": "uint256"
			}
		],
		"name": "hist1",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "idd",
				"type": "uint256"
			},
			{
				"name": "histtt",
				"type": "uint256"
			}
		],
		"name": "hist2",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "pdata",
		"outputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "uid",
				"type": "string"
			},
			{
				"name": "loc",
				"type": "string"
			},
			{
				"name": "intime",
				"type": "string"
			},
			{
				"name": "outime",
				"type": "string"
			},
			{
				"name": "hist",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "idd",
				"type": "uint256"
			}
		],
		"name": "rpro",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

var cont = web3.eth.contract(abi);

var contract = cont.at("0xf7d423643fc64e3db1fba30961adb7d7a2a4ed9a");

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());
var cors = require('cors');
app.use(cors());

app.post('/auth', function(req, res) {
        if(!req.body.username || !req.body.password) {
                return res.send("missing parameter");
        }
        else{   
                // Retrieve
                var MongoClient = require('mongodb').MongoClient;
                // Connect to the db
                MongoClient.connect("mongodb://localhost:27017", function(err, client) {
                        var db=client.db('invEdat');
                    db.collection('userlogin').findOne({user:req.body.username,pass:req.body.password}, function(err, result) {
                                if (err) 
                                        throw err;
                                if(result){
                                        console.log(result);
                                        res.send(result);
                                }
                                else{
                                        console.log("User Not Found")
                                        res.send("-1");
                                }
                        });
                });
        }
});
app.post('/fall', function(req, res) {
                // Retrieve
                var MongoClient = require('mongodb').MongoClient;
                // Connect to the db
                MongoClient.connect("mongodb://localhost:27017", function(err, client) {
                        var db=client.db('invEdat');
                    console.log(req.body);
                   db.collection('imagedat').find({user:req.body.username}).toArray(function(err, result) {
                                if (err) 
                                        throw err;
                                if(result){
                                        console.log(result);
                                        res.send(result);
                                }
                                else{
                                        console.log("User Not Found");
                                        res.send("-1");
                                }
                        }); 
                });
});

app.post('/verify', function(req, res) {
    console.log(req.body.proid);
    var pdd=parseInt(req.body.proid);
    console.log(web3.personal.unlockAccount(web3.eth.coinbase,"password"));
    var r=contract.rpro(pdd,{from: web3.eth.coinbase, gas: 300000});
    var his;
    var hstri='';
    console.log(web3.personal.unlockAccount(web3.eth.coinbase,"password"));
    var re=contract.hist1(pdd,{from: web3.eth.coinbase, gas: 300000});
    var i=0;
    while(i<r-1)
        {
            his=contract.hist2(pi,i,{from: web3.eth.coinbase, gas: 300000});
            hstri+=his+',';
            i++;
        }
    his=contract.hist2(pdd,i,{from: web3.eth.coinbase, gas: 300000});
    hstri+=his;
    console.log(r);
    console.log(r);
    console.log(hstri);
r.push(hstri);
        console.log(r);

    res.send(r);
});

app.post('/hist', function(req, res) {
    var pi=req.body.proid;
    var his;
    var hstri='';
    console.log(web3.personal.unlockAccount(web3.eth.coinbase,"password"));
    var r=contract.hist1(pi,{from: web3.eth.coinbase, gas: 300000});
    var i=0;
    while(i<r-1)
        {
            his=contract.hist2(pi,i,{from: web3.eth.coinbase, gas: 300000});
            hstri+=his+',';
            i++;
        }
    his=contract.hist2(pi,i,{from: web3.eth.coinbase, gas: 300000});
    hstri+=his;
});
app.listen(8050);
console.log('Listening on port 8050...');