const express = require('express');
const bodyparser = require("body-parser");
const app=express();
const MongoClient = require('mongodb').MongoClient;
var reload = require('../../reload');
var port = 8080;
var db;
var server = http.createServer(app);
reload(app);
app.set('port', process.env.PORT || 8080);
app.use(logger('dev'));
app.use(bodyParser.json());
server.listen(app.get('port'), function () {
    console.log('Web server listening on port ' + app.get('port'))
  })
var MongoId = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.controller('selectCtrl', function($scope) {
    $scope.docs = ["Cardiologists","Dermatologists","Gastroenterologists","Hematologists","Neurologists","Ophthalmologists","Physiatrists","Radiologists","Urologists"];
});

app.use('/',express.static('static'));

app.listen(port,()=>console.log('Project listening on port 3000!'));

MongoClient.connect('mongodb://localhost:27017/patientsystem',(err,database)=>{
    if (err) throw(err);
    database = client.db('patientsystem');
    app.listen(27017,()=>console.log('Project listening on port 27017!'))
})

app.post("/adduser",(res,req)=>{
    var myData = new User(req.body);
    myData.save()
        .then(item=>{
            res.send("User saved to database");
        })
        .catch(err=>{
            res.status(400).send("unable to save to database");
        });
});

app.post('/register', function(req, res) {
    req.body._id = null;
    var user = req.body;
    database.collection('users').insert(user, function(err, data) {
        if (err) return console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.send(user);
    })
});

app.post('/login', function(req, res) {
    var user = req.body;
    database.collection('users').findOne({
        'email': user.email,
        'password': user.password
    }, function(error, user) {
        if (error) {
            throw error;
        } else {
            if (user) {
                var token = jwt.sign(user, jwt_secret, {
                    expiresIn: 20000
                });
                res.send({
                    success: true,
                    message: 'Authenticated',
                    token: token
                })
                console.log("Authentication passed.");
            }
            else {
                res.status(401).send('Credentials are wrong.');
            }
        }
    });
});