const nodemailer = require("nodemailer");
const conn = require("../db");
require("dotenv").config();
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
// const express = require('express')
// const mailOptions = express();
// mailOptions.use(express.urlencoded({extended: true}));

const forgotPassword = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({ error: error.array() });
  }

  try {
    const email = req.body.email;
    await conn.query(
      `SELECT email FROM user WHERE email = '${email}'`,
      async (err, user) => {
        if (err) throw err;
        if (user.length === 0) {
          res
            .status(404)
            .json({ message: "User with this email does not exist" });
        } else {
          const id = user[0].id;
          const theToken = jwt.sign({ id }, process.env.R_P_KEY, {
            expiresIn: "5m",
          });
          const data = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "vishalkumar8673@gmail.com",
              pass: "vishalk1998",
            },
          });
          const mailOptions = {
            from: "vishalkumar8673@gmail.com",
            to: email,
            subject: "Account Activation Link",
            html: ` <h2> Please click on the given link to reset your Password</h2>
                  <p>${process.env.CLIENT_URL}/resetpassword/${theToken}</p>`,
          };

          return await conn.query(
            `UPDATE user SET resetlink = '${theToken}' WHERE email = '${email}'`,
            (err, success) => {
              if (err) {
                return res
                  .status(404)
                  .json({ message: "reset password link error" });
                
              } else {
                data.sendMail(mailOptions, (err, body) => {
                  if (err) {
                    return res.json({ error: err.message });
                  } else {
                    return res.json({
                      message: "Email has been sent successfully",
                    });
                  }
                });
              }
            }
          );
        }
      }
    );
  } catch (err) {
    next(err);
  }
};

const changePassword = async(req, res, next)=>{
  // const error = validationResult(req);
  // if(!error.isEmpty()){
  // return  res.status(422).json({error: error.array()});
  // }
  try{
   
    const resetLink = req.body.resetLink
    const newPass = req.body.newPass
    if(resetLink){
    await jwt.verify(resetLink, process.env.R_P_KEY, async(err, decodedData)=>{
      if(err){
        return res.status(401).json({error:'Incorrect Token or it is expired'});
      }
      else{
        await conn.query(`SELECT resetLink FROM user WHERE resetLink = '${resetLink}'`, async (err, user)=>{
          if(err){
            return res.status(400).json({error:'User with this token does not exist'});
          }
          else{
            const newPass =  await bcrypt.hash(newPass, 12)
            conn.query(`UPDATE user SET password= '${newPass}' WHERE resetLink ='${resetLink}'`, async (err)=>{
              if(err){
               return  res.status(400).json({error:'reset password error'});
              }
              else{
                await conn.query(`UPDATE user SET resetlink = null WHERE  resetLink = '${resetLink}'`)
                return res.status(200).json({message:'Password Changed Successfully'});
              }
            });
          }
        });
      }
    });
    }
    else
    {
      return res.status(401).json({message:'Authentication Error!!'});
    }
  }
  catch(err){
    console.log(err);
  }
};
module.exports= {forgotPassword, changePassword};