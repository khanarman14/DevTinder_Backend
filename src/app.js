const express = require('express')
const app = express()
const {connectDb} = require('./config/database')
const cookieParser = require('cookie-parser')
const authRouter=require('./router/authRouter')
const profileRouter=require('./router/profileRouter')


app.use(express.json());
app.use(cookieParser());
  

app.use("/",authRouter);      
app.use("/",profileRouter);      

  








    connectDb()
    .then(()=>{
        console.log("Database connection established");
        app.listen(7777,()=>{
            console.log("server is listening on port 7777");
        })
    })
    .catch(()=>{
        console.error("Database cannot be connected!!");
        
    })
