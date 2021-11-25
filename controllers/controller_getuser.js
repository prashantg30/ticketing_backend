// const jwt = require('jsonwebtoken');
// const conn = require('../db');

// //find user
// const getUser = async (req,res,next) => {

//     try{

//         if(
//             !req.headers.authorization ||
//             !req.headers.authorization.startsWith('Bearer') ||
//             !req.headers.authorization.split(' ')[1]
//         ){
//             return res.status(422).json({
//                 message: "Please provide the token",
//             });
//         }

//         const theToken = req.headers.authorization.split(' ')[1];
//         const decoded = jwt.verify(theToken, 'the-super-strong-secrect');
//         const row = await conn.query(
//             `SELECT * FROM user`, 
//         );
//         console.log(decoded.user_id);

//         if(row.length > 0){
//             return res.json({
//                 user:row
//             });
//         }

//         res.json({
//             message:"No user found"
//         });
        
//     }
//     catch(err){
//         next(err);
//     }
// }
//  module.exports = {getUser}