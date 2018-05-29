con.connect(function(err){
    if (err) throw err;
    console.log("connected");
    var sql ="UPDATE customers SET address =' zige3' WHERE address='zige 2'";
    con.query(sql,function(result,err){
        if(err) throw ere;
        console.loge(result.affectedRows+" records updated");
    });
});