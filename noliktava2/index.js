var connectionString = require ('./secrets').connectionString;
var dbName = require('./secrets').dbName;
const express = require('express');
var moment = require('moment');
var bodyParser     =        require("body-parser");
const app = express()
const port = process.env.PORT || 3000;

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var url = connectionString;
console.log('db string:', url)
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index');
});
app.post('/api/getnew',(req, res)=>{
    //Atgriežam tikai svaigākos itemus priekš veikala; svaigākus kā x. (post parametrs)
    console.log("getnew",req.body);
    var resp = {data:"Ķipa svaigākie ieraksti", time: req.body.laiks};

    MongoClient.connect(url, function(err, client) {
        console.log("Connected correctly to server.");

        var db = client.db(dbName);
        
        db.collection('products').find({"editTime": { $gt:req.body.laiks}}).toArray(function (err, result) {
            if (err) {
                res.send(err);
            } else {
                console.log('Svaigakais result:',result);
                res.send(result);
            }
        })
            
        client.close();
    });

});

app.get('/api/getall', (req, res) => {
    //atgriežam visu saturu - priekš noliktavas frontenda;
    MongoClient.connect(url, function(err, client) {
        console.log("Connected correctly to server.");

        var db = client.db(dbName);
        
        db.collection('products').find({}).toArray(function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        })
            
        client.close();
    });

});

app.post('/api/new', (req, res) => {
    //Atjaunojam noliktavas saturu;
    MongoClient.connect(url, function(err, client) {
        console.log("Connected correctly to server.");

        var db = client.db(dbName);
        console.log(req.body);
        var produkts = req.body.product;
        produkts.editTime = moment().format();
        
        db.collection('products').insertOne(produkts).then(()=>{res.send();});

        client.close();
    });
    
});

app.post('/api/update', (req, res) => {
    //Atjaunojam noliktavas saturu;
    MongoClient.connect(url, function(err, client) {
        console.log("Connected correctly to server.");

        var db = client.db(dbName);
        var produkts = req.body.product;
        produkts.editTime = moment().format();
        var id = produkts._id;
        delete produkts._id;
        console.log(req.body, id)
        db.collection('products').update(
            { "_id": ObjectID(id)}, // Filter
            produkts)
            .catch((err)=>{console.log(err);})
            .then((obj)=>{                
                    console.log('Updated - ' + obj);
                                    client.close();
                res.send();
        })
    });
    
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))