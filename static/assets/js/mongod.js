MongoClinet.connect(url,function(err,db){
    if(err) throw err;
    var dbo=db.db("mysql");
    var myquery = {address:"company address"};
    dbo.collection("customers").deleteOne(myquery,function(err,res){
        if(err) throw err;
        console.log("1 record deleted");
        db.close();
    });
});