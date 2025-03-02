const express = require('express')
const app = express()
const {connectDb} = require('./config/database')
const User = require('./models/user')
 

  
   app.post("/signup",async (req,res)=>{
         //creating a new instance of the user model   
     const user=new User({
        firstName:"sachin",
        lastName:"tendulkar",
        emailId:"sachin123@gmail.com",
        password:"Khan.arman"
     });

     try{
        await user.save();
        res.send("sucessfully signup!..");

     }catch(err){
        res.status(400).send("errot saving the user"+ err.message)
     }

     
  })
       
      
  













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
