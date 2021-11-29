const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const conn = require('../db')
const {validationResult} = require('express-validator')

const login = async (req, res, next)=>{
  const error = validationResult(req);

  if(!error.isEmpty()){
    return res.status(422).json({ error : error.array() });
  }

  try{
    const email = req.body.email
    const password = req.body.password
    await conn.query(`SELECT * FROM user WHERE email = '${email}'`,  async (err, result)=>{
      if(err) throw err;
      if(result.length > 0){
      await bcrypt.compare(password, result[0].password, (err, match)=>{
          if(match === true)
         
          {
            const id = result[0].id
            const token = jwt.sign({id}, 'theSuperStrongSecretPassword', {expiresIn: '1h'});
           
            return res.json({token: token});
          }
          else{
            return res.status(422).json({message:"Incorrect Password"});
          }
        });
      }
      else{
        res.status(422).json('Email does not exist');
      }
  });
}
  catch(err)
  {
    next(err);
  }
}
module.exports= login;