const nodemailer = require('nodemailer')
const otpGenerator = require('otp-generator')
const {validationResult} = require('express-validator')
const conn = require('../db')




const send = async (req, res, next)=>{

const error = validationResult(req)

if(!error.isEmpty()){
    return res.status(422).json({error: error.array()});
}

// const otps = otpGenerator.generate(6, { upperCaseAlphabets: false,lowerCaseAlphabets : false, specialChars: false });
// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'vishalkumar8673@gmail.com',
//       pass: 'vishalk1998'
//     }
//   });
  
//   var mailOptions = {
//     from: 'vishalkumar8673@gmail.com',
//     to: req.body.email,
//     subject: 'Sending Email using Node.js',
//     text: `your OTP '${otps}`

//   };
  
//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   })
try{
  conn.query(`select * from  user where email ='${req.body.email}'`,(err,result, Failed
    )=>{
    if(result.length == 1){
const otps = otpGenerator.generate(6, { upperCaseAlphabets: false,lowerCaseAlphabets : false, specialChars: false });
console.log(otps)
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vishalkumar8673@gmail.com',
      pass: 'vishalk1998'
    }
  });
  
  var mailOptions = {
    from: 'vishalkumar8673@gmail.com',
    to: req.body.email,
    subject: 'Sending Email using Node.js',
    text: `your OTP '${otps}`

  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  
  })
  conn.query(`insert into otp(otp_email,otp_pass) values('${req.body.email}','${otps}')`, (err)=>{
 console.log(err)
if(!err){
  console.log("ok")
}else{
  console.log("no")
}
  })
       
    }else{
      return res.status(422).json({message: "Invalid email address"})
    }

    })
}catch(err){
  next(err)
}
}


module.exports = {send}