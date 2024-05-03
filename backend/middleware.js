const {JWT_SECRET} = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next) =>{
    const authHeader =req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(403).json({});

    }

    const token = authHeader.split(' ')[1];//split the first element that is bearer and then decode other part

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
          
        if(decoded.userID)
       { req.userID = decoded.userID;

        next();}
        else{
            return res.status(403).json({});
        }
    }
    catch(err){
        return res.status(403).json({});
    }
    };

    module.exports = {
        authMiddleware
    }
