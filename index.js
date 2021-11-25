const express = require('express');
const conn = require('./db');
const route = require('./route');
const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());



conn.connect((err)=>{
    if(!err){
        console.log("Connection Successful");
    }
    else
    {
        console.log("Connection Failed");
        console.log(err);
    }
});
app.use(route);
app.get('/', (req, res) =>{
    res.send('Server is Running');
})
app.listen(3002, ()=>console.log("Server is listening at port: 3002"));


