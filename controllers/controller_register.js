const bcrypt = require('bcrypt');
const conn = require('../db');
const {validationResult} = require('express-validator');

const register = async (req,res,next)=>{
const error = validationResult(req)
if(!error.isEmpty()){
    return res.status(422).json({error: error.array()});
}
try{ 
  await conn.query(`select email from  user where email ='${req.body.email}'`,(result)=>
  {
    if(result.length == 1)
    {
        return res.status(201).json({message:"Email is already in use",});
    }
    else
    {
        bcrypt.hash(req.body.password, 12, function(hash) {
            conn.query(
                   `insert into user (name, email, password) values('${req.body.name}','${ req.body.email}','${hash}')`,(err, result)=>{
                      //  console.log(result)
                             if(!err){
                                res.status(201).json({message:"data inserted successfully"})
                                // console.log("data inserted successfully")
                                // console.log(hash)
                             }
                             else{
                                res.status(422).json({message:err})
                             }
                         });
                        
        });
       
    }

  }
  )
}catch(err){
    next(err);
}
}




module.exports= {register }