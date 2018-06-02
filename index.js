const express = require('express');
const router = express.Router();
const app = express();
const bodyparser = require("body-parser");
app.use('/', express.static('static'));
app.use(express.json());
app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})

var MongoClient = require('mongodb').MongoClient;
/*var url = "mongodb://localhost:27017/patientsystem";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
var url1 = "mongodb://localhost:27017/";
MongoClient.connect(url1, function(err, db) {
  if (err) throw err;
  var dbo = db.db("patientsystem");
  dbo.createCollection("users", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("patientsystem");
    var myobj = [
      { _id: 1, firstname: 'Tarik', lastname: 'Pribisic',date: '8.1.1997', place:'Sarajevo', gen: 'Male',username: 'Priba', password: 'something', email: 'pribajaba@gmail.com'},
      { _id: 2, firstname: 'Alma', lastname: 'Halilovic',date: '5.9.1996', place:'Sarajevo', gen: 'Female',username: 'Almy', password: 'somethingelse', email: 'alma.h@gmail.com'},
    ];
    dbo.collection("users").insertMany(myobj, function(err, res) {
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

app.post('/signup', function(req, res) {
    req.body._id = null;
    var user = req.body;
    patientsystem.collection('users').insert(user, function(err, data) {
        if (err) return console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.send(user);
    })
});

app.post('/login', function(req, res) {
    var user = req.body;
    patientsystem.collection('users').findOne({
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
app.put('/rest/v1/user/edit',function(request,response){
    user=request.body;
    db.collection('users').findOneAndUpdate({_id: new MongoId(user_id)},{
        $set:{username: user.username,
            firstname:user.firstname,
            lastname:user.lastname,
            date:user.date,
            gen:user.gen,
            password:user.password,
            email:user.email}
    },(err,result)=>{
        if(err) return res.send(err);
        response.send('OK')
    })
});
/*
app.get('/rest/v1/users',function(request,response){
    db.collection('users').find().toArray((err,users)=>{
        if(err) return console.log(err);
        response.setHeader('Content-Type','application/json');
        response.send(users);
    }); 
});

app.post('/rest/v1/user',function(request,response){
    db.collection('users').save(request.body,(err,result)=>{
        if(err) return console.log(err);
        response.send('OK');
    })
});

app.put('/rest/v1/user/edit',function(request,response){
    user=request.body;
    db.collection('users').findOneAndUpdate({_id: new MongoId(user_id)},{
        $set:{username: user.username,
            firstname:user.firstname,
            lastname:user.lastname,
            date:user.date,
            gen:user.gen,
            password:user.password,
            email:user.email}
    },(err,result)=>{
        if(err) return res.send(err);
        response.send('OK')
    })
});

app.delete('/rest/v1/user/delete/id',function(request,response){
    db.collection('users').findOneAndDelete({_id: new MongoId(request.params.id)},(err,result)=>{
        if(err) return res.send(500,err)
        response.send('OK');
    })
});*/
