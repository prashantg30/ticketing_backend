const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const conn = require('../db')
const {validationResult} = require('express-validator')
//login authentecation
const login = async (req,res,next) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{

    await conn.query(`select * from  user where email ='${req.body.email}'`,(err, result)=>{
            // console.log(result)
            if(result.length ===1 )
            { 
                const [row] = result
        //   console.log(row.password)
        //   console.log(req.body.password)
          bcrypt.compare(req.body.password, row.password, (err, result)=> {
        //  console.log(result)
          if(result === true)
          {
              jwt.sign({id:row.id},'the-super-strong-secrect',{ expiresIn: '1h' },(err,result)=>{
                if(!err)
                {
                    // console.log(result)
                    return res.json({
                             token:result
                         });
                }
            });
          }
          if(!result === true)
          {
            return res.status(422).json({ message: "Incorrect password",});
          }
        });

        }
            else {
                return res.status(422).json({message: "Invalid email address"})
            }
        })
    }
catch(err){
        next(err);
        // console.log(err);
    }
}
module.exports = {login}