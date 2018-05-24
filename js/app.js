var express = require('express');
var app=express();
const MongoClient = require('mongodb').MongoClient;
var port = 3000;
var db;
var bodyParser = require('body-parser');
angular.module('PMS',['ngRoute']);
app.config(function($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"views/home.html"
    })
    .when("/about",{
        templateUrl:"views/about.html"
    })
    .when("/blog",{
        templateUrl:"views/blog.html"
    })
    .when("/contact",{
        templateUrl:"views/contact.html"
    })
    .when("/log",{
        templateUrl:"views/log.html"
    })
    .when("/port",{
        templateUrl:"views/port.html"
    })
    .when("/services",{
        templateUrl:"views/services.html"
    })
    .when("/signup",{
        templateUrl:"views/signup.html"
    })
    .when("/item",{
        templateUrl:"views/item.html"
    })
    .when("/book",{
        templateUrl:"views/book.html"
    })
    .otherwise({redirectTo:'/'})
})
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