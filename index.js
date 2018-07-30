const express = require('express');
const router = express.Router();
const app = express();
const bodyparser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
const jwt_secret = 'WU5CjF8fHxG40S2t7oyk';
var MongoId = require('mongodb').ObjectID;
var patientsystem;

var jwt = require('jsonwebtoken');
app.use('/', express.static('static'));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
MongoClient.connect('mongodb://localhost:27017', function(err, client) {
    if (err) throw err;
    patientsystem = client.db('patientsystem');
    app.listen(8000, () => console.log('Example app listening on port 8000!'))
});

app.use('/index/', function(req, res, next) {
    jwt.verify(req.get('JWT'), jwt_secret, function(error, decoded) {
        if (error) {
            res.status(401).send('Unauthorized access!');
        } else {
            database.collection('users').findOne({
                '_id': new MongoId(decoded._id)
            }, function(error, user) {
                if (error) {
                    throw error;
                } else {
                    if (user) {
                        next();
                    } else {
                        res.status(401).send('Credentials are wrong.');
                    }
                }
            });
        }
    });
})

var url = "mongodb://localhost:27017/patientsystem";
/*
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
var url1 = "mongodb://localhost:27017/";
MongoClient.connect(url1, function(err, db) {
  if (err) throw err;
  var dbo = db.db("patientsystem");
  dbo.createCollection("books", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("patientsystem");
    var myobj = [
      { _id: 7,username:'Priba',salary:2000, country:'Sarajevo',email:'pribajaba@gmail.com',type:'doctor'},
    ];
    dbo.collection("emps").insertMany(myobj, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();
    });
  });*/
/*app.post("/adduser",(res,req)=>{
    var myData = new user(req,body);
    myData.save()
        .then(item=>{
            res.send("User saved to database");
        })
        .catch(err=>{
            res.status(400).send("unable to save to database");
        });
});*/
app.delete('/deleteUser',function(req,res){
    patientsystem.collection('users').remove({_id:new MongoId(req.params.user_id)},
    function(err,data){
        res.json(data);
    });
});
app.post('/signup', function(req, res) {
    req.body._id = null;
    var user = req.body;
    patientsystem.collection('users').insert(user, function(err, data) {
        if (err) return console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.send(user);
    })
});
app.post('/appointment', function(req, res) {
    req.body._id = null;
    var book = req.body;
    patientsystem.collection('books').insert(book, function(err, data) {
        if (err) return console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.send(book);
    })
});

app.post('/login', function(req, res) {
    var user = req.body;
    patientsystem.collection('users').findOne({
        'username': user.username,
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
                    message: 'Authenticated!',
                    token: token
                })
                console.log("Authentication successful!");
            }
            else {
                res.status(401).send('Credentials are incorect!');
            }
        }
    });
});
app.put('/emp/:emp_id', function(req, res){    
    patientsystem.collection('emps').findAndModify(
       {_id: new MongoId(req.params.emp_id)},
       [['_id','asc']],
       {$set : {username: req.body.username, salary: req.body.salary, country: req.body.country,email:req.body.email,type:req.body.type}},
       function(err, doc) {
           if (err){
               console.warn(err.message); 
           }else{
               res.json(doc);
           }
       });
});
app.put('/book/:book_id', function(req, res){    
    patientsystem.collection('books').findAndModify(
       {_id: new MongoId(req.params.book_id)},
       [['_id','asc']],
       {$set : {type: req.body.type,address:req.body.address,add:req.body.add}},
       function(err, doc) {
           if (err){
               console.warn(err.message); 
           }else{
               res.json(doc);
           }
       });
});
app.put('/user/:user_id', function(req, res){    
    patientsystem.collection('users').findAndModify(
       {_id: new MongoId(req.params.user_id)},
       [['_id','asc']],
       {$set : {firstname: req.body.firstname,lastname: req.body.lastname,date:req.body.date,place:req.body.place,gen:req.body.gen,username:req.body.username,email:req.body.email}},
       function(err, doc) {
           if (err){
               console.warn(err.message); 
           }else{
               res.json(doc);
           }
       });
});
app.put('/updateUser', function(req, res){    
    patientsystem.collection('users').findAndModify(
       {_id: new MongoId(req.params.user_id)},
       [['_id','asc']],
       {$set : {username: req.body.username,firstname:req.body.firstname, lastname:req.body.lastname,date:req.body.date,gen:req.body.gen,password:req.body.password,email:req.body.email}},
       function(err, doc) {
           if (err){
               console.warn(err.message); 
           }else{
               res.json(doc);
           }
       });
});
app.post('/addEmp', function(req, res){
    req.body._id = null;
    var emp = req.body;
    patientsystem.collection('emps').insert(emp, function(err, data){
        if(err) return console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.send(emp);
    })
});

app.get('/getEmp', function(request, response) {
    patientsystem.collection('emps').find().toArray((err, emp) => {
        if (err) return console.log(err);
        response.setHeader('Content-Type', 'application/json');
        response.send(emp);
    })
});
app.delete('/deleteEmp/:emp_id', function(req, res){
    patientsystem.collection('emps').remove({_id: new MongoId(req.params.emp_id)},
    function(err, data){
        res.json(data);
    });
});
app.get('/getUser', function(req, res){
    patientsystem.collection('users').find().toArray((err, user) => {
        if(err) return console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.send(user);
    })
});
app.get('/getBook', function(req, res){
    patientsystem.collection('books').find().toArray((err, book) => {
        if(err) return console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.send(book);
    })
});
app.post('/addBook', function(req, res){
    req.body._id = null;
    var book = req.body;
    patientsystem.collection('books').insert(book, function(err, data){
        if(err) return console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    })
});
app.get('/count', function(req, res){
    patientsystem.collection('users').find().count((err, data) => {
        if(err) return console.log(err);
        res.setHeader("Content-Type", "application/json");
        res.send({
            users_count: data
        })
    });
});
