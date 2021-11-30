const {body} = require('express-validator');
const registerValidator =[ 
    body('name',"The name must be of minimum 3 characters length")
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 }),
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim()
    .isEmail(),
    body('password',"The Password must be of minimum 4 characters length")
    .notEmpty()
    .trim()
    .isLength({ min: 6, max:12 }),
    ];

    const loginValidator =[ 
    
        body('email',"Invalid email address")
        .notEmpty()
        .escape()
        .trim().isEmail(),
        body('password',"The Password must be of minimum 4 characters length")
        .notEmpty()
        .trim()
        .isLength({ min: 6, max:12 }),
        ];

     const resetPassword =[
         body('email', "invalid email address")
         .notEmpty()
         .escape()
         .trim()
         .isEmail(),
        
     ]   
     const convertPassword =[
         body('newPass', "Password must be between 6 to 12 characters")
         .notEmpty()
         .isLength({ min: 6, max:12 })
     ]

        module.exports = {registerValidator,loginValidator , resetPassword, convertPassword}