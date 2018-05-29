var mysql = require('mysql');

var con = mysql.createConnection({
    host:"localhost",
    user:"priba",
    password:"pass"
});

con.connect(function(err){
    if(err)throw err;
    console.log("connected");
})

