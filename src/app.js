const express = require('express')
const app = express()
const cors = require('cors')
const {connectDb} = require('./config/database')
const cookieParser = require('cookie-parser')
const authRouter=require('./router/authRouter')
const profileRouter=require('./router/profileRouter')
const connectionRouter=require('./router/connectionRouter')
const userRouter=require('./router/userRouter')

app.use(cors({
        origin: 'http://localhost:5173',
        credentials:true,

}))
app.use(express.json());
app.use(cookieParser());


app.use("/",authRouter);      
app.use("/",profileRouter);      
app.use("/",connectionRouter);      
app.use("/",userRouter);      






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
