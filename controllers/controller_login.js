const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const conn = require('../Db')
const {validationResult} = require('express-validator')
//login authentecation
const login = async (req,res,next) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{

    //     await conn.query(
    //         "SELECT * FROM `users` WHERE `email`=?",
    //         [req.body.email]
    //       );


    //     if (row.length === 0) {
    //         return res.status(422).json({
    //             message: "Invalid email address",nodemon
    //         });
    //     }

    //     const passMatch = await bcrypt.compare(req.body.password, row[0].password);
    //     if(!passMatch){
    //         return res.status(422).json({
    //             message: "Incorrect password",
    //         });
    //     }

    //     const theToken = jwt.sign({id:row[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });

    //     return res.json({
    //         token:theToken
    //     });

    await conn.query(`select * from  user where email ='${req.body.email}'`,(err,result, Failed
        )=>{console.log(result)
            if(result.length ===1 ){ 
           const [row] = result
          console.log(row.password)
          console.log(req.body.password)
          bcrypt.compare(req.body.password, row.password, (err, result)=> {
          console.log(result)
        });

            }else {
                return res.status(422).json({message: "Invalid email address"})
            }
        })
    }
catch(err){
        next(err);
        console.log(err);
    }
}
module.exports = {login}