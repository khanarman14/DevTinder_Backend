const express = require('express')
const app = express()
const {connectDb} = require('./config/database')
const User = require('./models/user')
app.use(express.json());

  
app.post("/signup",async (req,res)=>{
         //creating a new instance of the user model  
       
    const user=new User(
        req.body
     );

     try{
        await user.save();
        res.send("sucessfully signup!..");

     }catch(err){
        res.status(400).send("errot saving the user"+ err.message)
     } 

     
  });
       

app.get("/user",async (req,res)=>{
     
       const userEmail=req.body.emailId;
try{
    const users=await User.find({emailId: userEmail});
           if(users.length===0){
            res.send("user not found");
           }    

    else
    {
        res.send(users);
    }   

}

catch(err){
   res.status(400).send("something went wrong "+ err.message)
} 


});


app.get("/feed",async (req,res)=>{
     
   
try{
 const users=await User.find({});
res.send(users);


}catch(err){
res.status(400).send("something went wrong "+ err.message)
} 


});

app.delete("/user",async(req,res)=>{
     
    const userId=req.body.userid;
    

  try{
     await User.findByIdAndDelete({_id:userId})
     res.send("user deleted successfully!!....")

  }catch(err){
           res.status(400).send("something went wrong "+ err.message)
} 

});




  













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
