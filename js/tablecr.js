con.connect(function(err){
    if(err) throw err;
    console.log("welcome");
    var sql="CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
    con.query(sql,function(err,result){
        if(err) throw err
        console.log("Table created");
    });
});