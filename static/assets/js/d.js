con.connect(function(err){
    if(err) throw err;
    console.log("connected");
    var sql="DELETE FROM customers THERE address='zige2'";
    con.query(sql,function(err,result){
        if(err) throw err;
        console.log("number of records deleted "+result.affectedRows);
    });
});