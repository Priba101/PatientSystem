const expres = require('express');
const app=express();

app.use('/',express.static('static'));

app.listen(8080,()=>console.log('Example listening on port 8080!'));

app.get('/rest/v1/users',function(request,response){
    response.setHeader('Content-Type','application/json');
    response.send([
        {}
    ]);
});

app.post('/rest/v1/user',function(request,response){
    db.collection('users').save(request.body,(err,result)=>{
        if(err) return console.log(err);
        response.send('OK');
    })
});

app.put('/rest/v1/user/edit',function(request,response){
    user=request.body;
    for(i=0;i<users.length();i++){
        if(users[i].id==user.id){
            users[i].username=user.username;
            users[i].firstname=user.firstname;
            users[i].lastname=user.lastname;
            users[i].date=user.date;
            users[i].gen=user.gen;
            users[i].password=user.password;
            users[i].email=user.email;
        }
    }
    console.log(users);
    response.send('Updated');
});

app.delete('/rest/v1/user/delete/id',function(request,response){
    var user_id=request.params.id;
    for(i=0;i<users.length();i++){
        if(users[i].id==user_id){
        users.splice(i,1);
        }
    }
    console.log(users);
    response.send('Deleted');
});
