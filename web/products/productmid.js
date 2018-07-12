var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());
var cors = require('cors');
app.use(cors());
//to login
app.post('/find', function(req, res) {
                // Retrieve
                var MongoClient = require('mongodb').MongoClient;
                // Connect to the db
                MongoClient.connect("mongodb://localhost:27017", function(err, client) {
                        var manu=client.db('manu');
                    manu.collection('userlogin').find({}).toArray(function(err, result) {
                                if (err) 
                                        throw err;
                                if(result){
                                        console.log(result);
                                        return res.send(result);
                                        manu.close();
                                }
                                else{
                                        console.log("No products in inventory.")
                                        manu.close();
                                }
                        });
                });
});