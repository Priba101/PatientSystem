MongoClient.connect(url,function(err,db){
    if(err) throw err;
    var dbo= db.db("mydb");
    var myobj={name:"company name",address:"company address"};
    dbo.collection("cusutomers").insertOne(myobj,function(err,res){
        if(err) throw err;
        console.log("1 document added");
        db.close();
    });
});