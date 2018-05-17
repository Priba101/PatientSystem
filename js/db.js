con.connect(function(err){
    if(err) throw err;
    console.log("connected");
    con.query("CREATE DATABASE mydb", function(err,result){
        if(err) throw err
        console.log("DB created!");
    });
});
