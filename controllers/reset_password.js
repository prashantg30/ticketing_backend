const nodemailer = require('nodemailer')
const otpGenerator = require('otp-generator')
const {validationResult} = require('express-validator')



const send = async (req, res, next)=>{

const error = validationResult(req)

if(!error.isEmpty()){
    return res.status(422).json({error: error.array()});
}

const otps = otpGenerator.generate(6, { upperCaseAlphabets: false,lowerCaseAlphabets : false, specialChars: false });
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
}


module.exports = {send};