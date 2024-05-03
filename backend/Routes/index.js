const express = require('express');
const app = express();
const router = express.Router();
const userRouter = require("./user")

router.use("/user", userRouter);

{/*router.get('/',function (req,res,next) {
    console.log("Router working");
    res.end();
})
app.use(router);*/}
module.exports = router;

//