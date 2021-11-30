const mysql = require('mysql');

const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"cloudstok",
    multipleStatements:true
});

module.exports=conn;