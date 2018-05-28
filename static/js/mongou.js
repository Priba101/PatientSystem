MongoClient.connect(url,function(err,db){
    if(err) throw err;
    var dbo=db.db("mydb");
    var myquery={address:"company address"};
    var newValues={$set:{name:"Mickey", address:"Canyon 123"}};
    dbo.collection("customers").updateOne(myquery,newValues,function(err,res){
        if(err) throw err;
        console.log("1 document updated");
    db.close();
    });
});