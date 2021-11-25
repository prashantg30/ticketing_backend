const bcrypt = require('bcrypt');
const conn = require('../db');
const {validationResult} = require('express-validator');

const register = async (req,res,next)=>{
const error = validationResult(req)
if(!error.isEmpty()){
    return res.status(422).json({error: error.array()});
}
try{

    const row = await conn.query(
        "select email from user where email = ?",
        [req.body.email]
    );
    console.log(row);
    if(row.length > 0){
        return res.status(201).json({message:"Email is already in use",});
    }
    const hashpass = await bcrypt.hash(req.body.password,12);
    const rows  = await conn.query(
        'insert into user (name, email, password) values(?,?,?)',[
          req.body.name,
          req.body.email,
          hashpass
        ]);
        if(rows.effectedRows==1){
            res.status(201).json({message:"data inserted successfully"})
        }

}catch(err){
    next(err);
}
}




module.exports= {register }