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


const path = require('path');
const fs = require('fs');
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser')
const app = express();
const router = express.Router();

const DIR = './uploads';
 var fna;
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
        fna=file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname);
        
      cb(null, fna);
        
        console.log(fna);
    }
});
let upload = multer({storage: storage});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
 
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
 
app.get('/api', function (req, res) {
  res.end('file catcher example');
});
 
app.post('/api/upload',upload.single('photo'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
        var userr=req.body.username;
        var pid;
    var ke;
    var ln=req.body.location;
    var pat=fna;
const microsofComputerVision = require("microsoft-computer-vision");
data=fs.readFile('./uploads/'+fna, function(err, data) {
    if (err)
        throw err;
 
    microsofComputerVision.analyzeImage({
      "Ocp-Apim-Subscription-Key": "7f7447787a8e48d7a762ba3694d92e88",
      "request-origin":"westcentralus",
      "content-type": "application/octet-stream",
      "body": data,
      "visual-features":"Tags, Faces"
    }).then((result) => {
        console.log(result);    
        var ke=result.tags[0].name+'+'+result.tags[1].name+'+'+result.tags[2].name;
        console.log(ke);
         var MongoClient = require('mongodb').MongoClient;
                // Connect to the db
                MongoClient.connect("mongodb://localhost:27017", function(err, client) {
                        var db=client.db('invEdat');
                    db.collection('imagedat').find().sort({proid:-1}).limit(1).toArray(function(err, result) {
                            
                    console.log(result);
                            pid=result[0].proid+1;
                        entry={user:userr,proid:pid,keywords:ke,loc:ln,imgpath:pat};
                        
                        db.collection('imagedat').insertOne(entry, function(err, result) {
                                           if (err) throw err;
                                                  
                                var dateTime = require('node-datetime');
                                var dt = dateTime.create();
                                var formatted = dt.format('Y-m-d H:M:S');
                                         
                              console.log("Product No."+pid+" was entered.");
                              console.log(web3.personal.unlockAccount(web3.eth.coinbase,"password"));
                                
         var r=contract.addp(pid,ln,userr,formatted,{from:web3.eth.coinbase,gas:300000});

                                       

                                       console.log("Added to block"); 
                    });
             }); 
    });   

        
        
        

    }).catch((err)=>{
      throw err;
    })
});
        return res.send({
          success: true
        })
      }
});
 
app.post('/webimage', function (req, res) {   
    var _pid;
    var base64ToImage = require('base64-to-image');
    var fnaa='P'+Date.now()+'.jpeg';
    var base64Str = req.body.b6;
    var base64Image = base64Str.split(';base64,').pop();
    fs.writeFile('./uploads/'+fnaa, base64Image, {encoding: 'base64'}, function(err) {
    console.log('File created');});
    var userr=req.body.username;
        var pid;
    var ke;
    var ln=req.body.location;
const microsofComputerVision = require("microsoft-computer-vision");
data=fs.readFile('./uploads/'+fnaa, function(err, data) {
    if (err)
        console.log(err);
 
    microsofComputerVision.analyzeImage({
      "Ocp-Apim-Subscription-Key": "7f7447787a8e48d7a762ba3694d92e88",
      "request-origin":"westcentralus",
      "content-type": "application/octet-stream",
      "body": data,
      "visual-features":"Tags, Faces"
    }).then((result) => {
        console.log(result);    
        var ke=result.tags[0].name+'+'+result.tags[1].name+'+'+result.tags[2].name;
        console.log(ke);
         var MongoClient = require('mongodb').MongoClient;
                // Connect to the db
                MongoClient.connect("mongodb://localhost:27017", function(err, client) {
                        var db=client.db('invEdat');
                    db.collection('imagedat').find().sort({proid:-1}).limit(1).toArray(function(err, result) {
                            
                    console.log(result);
                            pid=result[0].proid+1;
                        
                        entry={user:userr,proid:pid,keywords:ke,loc:ln,imgpath:fnaa};
                        
                        db.collection('imagedat').insertOne(entry, function(err, result) {
                                           if (err) throw err;
                                                  
                                var dateTime = require('node-datetime');
                                var dt = dateTime.create();
                                var formatted = dt.format('Y-m-d H:M:S');
                                         
                              console.log("Product No."+pid+" was entered.");
                            _pid=pid;
                            console.log(_pid);console.log("haha");
                            console.log(web3.personal.unlockAccount(web3.eth.coinbase,"password"));
                                
         var r=contract.addp(pid,ln,userr,formatted,{from:web3.eth.coinbase,gas:300000});

                                       

                                       console.log("Added to block"); 
                    });
             }); 
    });   

        
     console.log(_pid);console.log("hahhaaa");
        

    }).catch((err)=>{
      throw err;
    })
});console.log(_pid);
    console.log("ha");
    res.send(_pid);
});

const PORT = process.env.PORT || 8060;
 


app.listen(PORT, function () {
  console.log('Node.js server is running on port ' + PORT);
});