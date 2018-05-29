con.connect(function (err){
    if(err) throw err;
    console.log("connected");
    var sql="INSERT INTO customers(name,address) VALUES ('zige','sve 2')";
    con.query(sql,function(err,result){
        if(err) throw err;
        console.log("1 data inserted");
    });
});