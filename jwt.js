const jwt = require('jsonwebtoken')
require('dotenv').config();

const validateToken = async (req, res, next) => {

    const accesstoken = req.token["header"];
    if(!accesstoken){
        return res.status(400).json({error:"User not authenticated"});
    }
    try{
        const validToken = jwt.verify(accesstoken, process.env.DB_SSP);
        if(validToken){
            req.authenticated = true;
            return next();

        }
    }
    catch(err){
        return res.status(400).json({error: err});
    }
}
module.exports = validateToken;