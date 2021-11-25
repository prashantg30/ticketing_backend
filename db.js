const mysql = require('mysql');

const conn = mysql.createConnection({
    host:"sql6.freemysqlhosting.net",
    user:"sql6453266",
    password:"yA1bSJUwdz",
    database:"sql6453266",
    multipleStatements:true
});

module.exports=conn;