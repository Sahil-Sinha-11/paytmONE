const express = require('express');
const router = express.Router();
const {User} = require("../db");
const JWT_SECRET = require("../config")  
const jwt = require("jsonwebtoken");
const app = express();
const zod = require ("zod");
const  { authMiddleware } = require("../middleware");


const signupSchema= zod.object({  //the signup schema is getting checked by zod i.e. 
       username: zod.string(),   // the object's username should be string
       password: zod.string(),  // the object's password should be string and so on
       firstName: zod.string(),
       lastName: zod.string()

})

router.get("/signup", async (req,res)=>{
              
         const body = req.body;
        const {success} = signupSchema.safeParse(req.body);// we are checking if signup schema is alid using safe parse

        if(!success){
            return res.status(411).json({
                message: "Email already taken / incorret input"
            })
        }
           
        const existingUser= await User.findOne({
            username: req.body.username
        })

        if(existingUser){
            return res.status(411).json({
                message: "Email already taken / incorret input"
            })
        }

        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.user.firstName,
            lastName: req.body.lastName

        })

        const userId = user._id;

        const token = jwt.sign({
            userId
        }, JWT_SECRET);

        res.json({
            message: "USer created successfully",
            token: token
        })

})

router.post("/signin",(req,res)=>{

    const body = req.body;
    const {usersigninsuccess} = signinSchema.safeParse(req.body);
    
    if(usersigninsuccess){
        token: 
        res.status(200).json(token);
        
    }
    else{
        res.status(411).json("Error while logging in");
    }
})


//CHANGING DETAILS AS PER USER REQUIREMENT


const updateBody = zod.object({
    password: zod.string().optional(),
    lastName : zod.string().optional(),
    firstName: zod.string().optional()
    
})

router.put("/", authMiddleware, async (req,res)=>{
    const {success} = update.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message: " Error while handling information"
        })
    }

    await User.updateOne(req.body, {
        id: req.userID
    })

    res.json({
        message: "updated successfully"
    })
})

module.exports = router;

