var connectionString = require ('./secrets').connectionString;
var dbName = require('./secrets').dbName;
var request = require('request');
const express = require('express');
var ObjectID = require('mongodb').ObjectID;
var moment = require('moment');
var bodyParser     =        require("body-parser");
const app = express()
const port = process.env.PORT || 3001;

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var dburl = connectionString;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/api/getall', (req, res) => {
    //atgriežam visu datubāzes saturu - priekš veikala frontenda;
    MongoClient.connect(dburl, function(err, client) {
        console.log("Connected correctly to server.");

        var db = client.db(dbName);
        
        db.collection('veikals').find({}).toArray(function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        })
        
        client.close();
    });
});

app.get('/api/updateall', (req, res) => {
    //atjaunojam datus no noliktavas un atgriežam visu saturu - priekš veikala frontenda;

    MongoClient.connect(dburl, function(err, client) {
        console.log("Connected correctly to server.");
        var url = 'http://localhost:3000';
        var url2 = 'http://elinas-noliktava.azurewebsites.net';
        

        url = url + '/api/getnew';

        var db = client.db(dbName);
        
        db.collection('veikals').find().sort( { editTime: -1 } ).limit(1)
            .toArray(function (err, result) {
            if (err) {
                console.log("error????",err);
                // res.send(err);
            } else {
                var time = result.length && result[0].editTime || '0';
                console.log('Edit time:',time);
                request.post(
                    url,
                    { json: { laiks: time } },
                    function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            //console.log(body)
                            var dati = body;
                            //save datubāzē;
                            var promiseArr = [];
                            MongoClient.connect(dburl, function(err, client1) {
                                console.log("Connected correctly to server.", err, dburl);
                        
                                var db1 = client1.db(dbName);                                 
                                dati.forEach(element => {
                                    //ir vai nav pieejams?
                                    element.available = element.amount > 0;
                                    var elId = element._id;
                                    delete element._id;
                                    console.log("updating single item: ", elId, element);

                                    var promise =  db1.collection('veikals')                                    
                                    .update(
                                        { "_id": ObjectID(elId)}, // query
                                        element, //new value
                                        {upsert: true} //options
                                    );
                                    promiseArr.push(promise);
                                    console.log("1");
                                });
                                console.log("promise Arr size:", promiseArr.length);
                                
                                    Promise.all(promiseArr)      
                                    .catch((err)=>{console.log("update Error2:",err)})
                                    .then(()=>{
                                        console.log("update done");
                                        client1.close();
                                        res.send();
                                    });

                            });
                            
                        }
                    }
                );
            }
        })
        client.close();
        
    });


    // MongoClient.connect(dburl, function(err, client) {
    //     console.log("Connected correctly to server.");

    //     var db = client.db(dbName);
        
    //     db.collection('veikals').find({}).toArray(function (err, result) {
    //         if (err) {
    //             res.send(err);
    //         } else {
    //             res.send(result);
    //         }
    //     })
    //     client.close();
    // });

});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))