var express = require('express');
var app=express();
const MongoClient = require('mongodb').MongoClient;
var db;

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

app.controller('selectCtrl', function($scope) {
    $scope.docs = ["Cardiologists","Dermatologists","Gastroenterologists","Hematologists","Neurologists","Ophthalmologists","Physiatrists","Radiologists","Urologists"];
});

app.use('/',express.static('static'));

app.listen(8080,()=>console.log('Project listening on port 8080!'));

MongoClient.connect('mongodb://localhost:8080/pms',(err,database)=>{
    if (err) return console.log(err)
    db=database
    app.listen(8080,()=>console.log('Project listening on port 8080!'))
})