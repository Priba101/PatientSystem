const express = require('express');
const router = express.Router();
const app = express();
const bodyparser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
const jwt_secret = 'WU5CjF8fHxG40S2t7oyk';
const jwt_admin = 'SJwt25Wq62SFfjiw92sR';
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
    jwt.verify(req.get('JWT'), jwt_admin, function(error, decoded) {
        if (error) {
            res.status(401).send('Unauthorized access!');
        } else {
            patientsystem.collection('users').findOne({'_id': new MongoId(decoded._id)}, function(error, user) {
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
app.get('/me', function(req, res){
    jwt.verify(req.get('JWT'), jwt_secret, function(error, decoded){
        if(error){
            console.log(error);
        }else{
            patientsystem.collection("users").find({"_id": new MongoId(decoded._id)}).toArray(function(error, user) {
                res.setHeader('Content-Type', 'application/json');
                res.send(user);
            })
        }
    })
});
app.use('/admin/',function(req,res,next){
    jwt.verify(req.get('JWT'), jwt_admin, function(error, decoded) {     
      if (error) {
        res.status(401).send('Unauthorized access'); 
        console.log(error);   
      } else {
        patientsystem.collection("users").findOne({'_id': new MongoId(decoded._id)}, function(error, user) {
          if (error){
            throw error;
          }else{
            if(user){
              next();
            }else{
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
  dbo.createCollection("help", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});*/
/*MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("patientsystem");
    var myobj = [
      { _id: 9,name:'Priba',num:033123123, email:'tarik@gmail.com',mess:'nothing much',reply:'Dear Mr.Tarik According to our studies this shit is soooo stupid soooo here you goooo test djaocdjaisjcaioejdcoiajciajd aljkdajcjeoiajcaojcoiaejc apcjajceojcaoijcioa j ocj oiejcoiejcoi'},
    ];
    dbo.collection("questions").insertMany(myobj, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();
    });
  });
app.post("/adduser",(res,req)=>{
    var myData = new user(req,body);
    myData.save()
        .then(item=>{
            res.send("User saved to database");
        })
        .catch(err=>{
            res.status(400).send("unable to save to database");
        });
});*/
app.delete('/deleteUser/:user_id', function(req, res){
    patientsystem.collection('users').remove({_id: new MongoId(req.params.user_id)},
    function(err, data){
        res.json(data);
    });
});
app.delete('/deleteBook/:book_id',function(req,res){
    patientsystem.collection('books').remove({_id:new MongoId(req.params.book_id)},
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
/*app.post('/signup', function(req, res) {
    req.body._id = null;
    var user = req.body;
    patientsystem.collection('users').findOne({
        'username': user.username
    }, function(error, user) {
        if (error) {
            throw error;
        } else {
            if (user) {
                res.send({
                    success: false,
                    user: null
                })
                console.log("User exists in database!");
            }
            else {
                patientsystem.collection('users').insert(user, function(err, data) {
                    if (err) return console.log(err);
                    res.setHeader('Content-Type', 'application/json');
                    res.send({
                        success: true,
                        user: user
                    });
                })
            }
        }
    });
});*/
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
                if(user.type=="patient"){
                var token = jwt.sign(user, jwt_secret, {
                    expiresIn: 20000
                });
                res.send({
                    success: true,
                    message: 'Patient authenticated!',
                    token: token,
                    type:'patient',
                    username:user.username
                })
                console.log("Authentication successful!");
            }
            else if(user.type=="admin"){
                var token = jwt.sign(user, jwt_secret, {
                    expiresIn: 20000
                });
                res.send({
                    success: true,
                    message: 'Admin authenticated!',
                    token: token,
                    type:'admin',
                    username:user.username
                })
                console.log("Authentication successful!");
            }
            else if(user.type=="doctor"){
                var token = jwt.sign(user, jwt_secret, {
                    expiresIn: 20000
                });
                res.send({
                    success: true,
                    message: 'Doctor authenticated!',
                    token: token,
                    type:'doctor',
                    username:user.username
                })
                console.log("Authentication successful!");
            }
            else if(user.type=="nurse"){
                var token = jwt.sign(user, jwt_secret, {
                    expiresIn: 20000
                });
                res.send({
                    success: true,
                    message: 'Nurse authenticated!',
                    token: token,
                    type:'nurse',
                    username:user.username
                })
                console.log("Authentication successful!");
            }
            else if(user.type=="secretary"){
                var token = jwt.sign(user, jwt_secret, {
                    expiresIn: 20000
                });
                res.send({
                    success: true,
                    message: 'Secretary authenticated!',
                    token: token,
                    type:'secretary',
                    username:user.username
                })
                console.log("Authentication successful!");
            }
        }
        else {
            res.status(401).send('Credentials are incorect!');
        }}
    });
});
app.put('/answerHelp/:q_id',function(req,res){
    patientsystem.collection('help').findAndModify(
        {_id: new MongoId(req.params.q_id)},
        [['_id','asc']],
        {$set : {reply: req.body.reply}},
        function(err, doc) {
            if (err){
                console.warn(err.message); 
            }else{
                res.json(doc);
            }
        });
})
app.put('/emp/:emp_id', function(req, res){    
    patientsystem.collection('emps').findAndModify(
       {_id: new MongoId(req.params.emp_id)},
       [['_id','asc']],
       {$set : {username: req.body.username, salary: req.body.salary, country: req.body.country,type:req.body.type,spec:req.body.spec}},
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
app.put('/books/:books_id', function(req, res){    
    patientsystem.collection('books').findAndModify(
       {_id: new MongoId(req.params.books_id)},
       [['_id','asc']],
       {$set : {reply:req.body.reply}},
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
       {$set : {firstname: req.body.firstname,lastname: req.body.lastname,date:req.body.date,place:req.body.place,gen:req.body.gen,username:req.body.username,email:req.body.email,type:req.body.type}},
       function(err, doc) {
           if (err){
               console.warn(err.message); 
           }else{
               res.json(doc);
           }
       });
});
app.put('/users/:user_id', function(req, res){
    patientsystem.collection('users').findAndModify(
       {_id: new MongoId(req.params.user_id)},
       [['_id','asc']],
       {$set : {phone:req.body.phone,country:req.body.country,zip:req.body.zip}},
       function(err, doc) {
           if (err){
               console.warn(err.message); 
           }else{
               res.json(doc);
           }
       });
});
/*app.put('/updateUser', function(req, res){    
    patientsystem.collection('users').findAndModify(
       {_id: new MongoId(req.params.user_id)},
       [['_id','asc']],
       {$set : {username: req.body.username,firstname:req.body.firstname, lastname:req.body.lastname,date:req.body.date,gen:req.body.gen,password:req.body.password,email:req.body.email,type:req.body.type}},
       function(err, doc) {
           if (err){
               console.warn(err.message); 
           }else{
               res.json(doc);
           }
       });
});*/
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
app.get('/currentBookUser/:user',function(request,response) {
    request.body.user = request.params.user;
    patientsystem.collection('books').find({'user':request.params.user}).toArray((err,book)=>{
        if(err) return console.log(err);
        response.setHeader('Content-Type','application/json');
        response.send(book);
    })
});
app.get('/currentMessageUser/:user',function(request,response) {
    request.body.user = request.params.user;
    patientsystem.collection('questions').find({'user':request.params.user}).toArray((err,message)=>{
        if(err) return console.log(err);
        response.setHeader('Content-Type','application/json');
        response.send(message);
    })
});
app.delete('/deleteEmp/:emp_id', function(req, res){
    patientsystem.collection('emps').remove({_id: new MongoId(req.params.emp_id)},
    function(err, data){
        res.json(data);
    });
});
app.delete('/deleteHelp/:q_id', function(req, res){
    patientsystem.collection('help').remove({_id: new MongoId(req.params.q_id)},
    function(err, data){
        res.json(data);
    });
});
app.delete('/deleteFeedback/:feedback_id', function(req, res){
    patientsystem.collection('feedback').remove({_id: new MongoId(req.params.feedback_id)},
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
app.post('/addBook/:user', function(req, res){
    req.body.user = req.params.user;
    var book = req.body;
    patientsystem.collection('books').insert(book, function(err, data){
        if(err) return console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    })
});
app.post('/question/:user',function(req,res){
    req.body.user = req.params.user;
    var question=req.body;
    patientsystem.collection('questions').insert(question,function(err,data){
        if(err) return console.log(err);
        res.setHeader('Content-Type','application/json');
        res.send(data);
    })
})
app.post('/helpQuestion/:user',function(req,res){
    req.body.user = req.params.user;
    var q=req.body;
    patientsystem.collection('help').insert(q,function(err,data){
        if(err) return console.log(err);
        res.setHeader('Content-Type','application/json');
        res.send(data);
    })
})
app.get('/count', function(req, res){
    patientsystem.collection('users').find().count((err, data) => {
        if(err) return console.log(err);
        res.setHeader("Content-Type", "application/json");
        res.send({
            users_count: data
        })
    });
});
app.get('/countFeedback', function(req, res){
    patientsystem.collection('feedback').find().count((err, data) => {
        if(err) return console.log(err);
        res.setHeader("Content-Type", "application/json");
        res.send({
            feedback_count: data
        })
    });
});
app.get('/getQuestion', function(request, response) {
    patientsystem.collection('questions').find().toArray((err, question) => {
        if (err) return console.log(err);
        response.setHeader('Content-Type', 'application/json');
        response.send(question);
    })
});
app.put('/question/:question_id', function(req, res){    
    patientsystem.collection('questions').findAndModify(
       {_id: new MongoId(req.params.question_id)},
       [['_id','asc']],
       {$set : {reply:req.body.reply}},
       function(err, doc) {
           if (err){
               console.warn(err.message); 
           }else{
               res.json(doc);
           }
       });
});
app.post('/feedbacking', function(req, res){
    req.body._id = null;
    var feedback = req.body;
    patientsystem.collection('feedback').insert(feedback, function(err, data){
        if(err) return console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    })
});
app.get('/getFeedback', function(req, res){
    patientsystem.collection('feedback').find().toArray((err, feedback) => {
        if(err) return console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.send(feedback);
    })
});
app.get('/getHelp', function(req, res){
    patientsystem.collection('help').find().toArray((err, q) => {
        if(err) return console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.send(q);
    })
});
app.get('/getDoctors',function(req,res){
    patientsystem.getCollection("users").find({type:'doctor'},  
    function(err, doc) {
        if (err) return console.log(err);
        response.send(doc);
    });
})