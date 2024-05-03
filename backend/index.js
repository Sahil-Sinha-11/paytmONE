const express = require("express");
const app = express();
const cors=require('cors');

const mongoose = require("mongoose");
const authMiddleware = require ('./middleware.js')

mongoose.connect("mongodb+srv://sahilsinha6969:MLe1wkzKfWyHP31Q@cluster0.oc9ols2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

app.use(cors())
app.use(express.json())

const mainRouter = require("./Routes/index.js");



app.use("/api/v1", mainRouter); //all request comming to /api/vi goes to main router



app.get('/', (req,res)=> {
    res.send("Hello from server");
})

app.listen(8080, ()=>{
     console.log("server running on port")
    })