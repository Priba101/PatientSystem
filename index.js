const express = require('express')
const app = express()

app.use('/', express.static('static'));
app.use(express.json());
app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})

//asdadna
/*const expres = require('express');
const app=express();

app.use('/',express.static('static'));

app.listen(8080,()=>console.log('Example listening on port 8080!'));

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
