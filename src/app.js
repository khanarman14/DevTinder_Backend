const express = require('express')
const app = express()
const {connectDb} = require('./config/database')
const User = require('./models/user')
app.use(express.json());
const {signUpvalidation}=require('./utils/validation')
const bcrypt = require('bcrypt');


  
app.post("/signup",async (req,res)=>{ 
           
         try{
             
             signUpvalidation(req);
            const {firstName,lastName,emailId,password}= req.body;
            const hashPassword= await bcrypt.hash(password,10)
           
  const user=new User({
                 firstName,
                 lastName,
                 emailId,
                 password:hashPassword

         });
               
      
        await user.save();
        res.send("sucessfully signup!..");

     }catch(err){
        res.status(400).send("error saving the user "+ err.message)
     } 

     
  });
       
app.post("/login",async(req,res)=>{
    try{
          
        const{emailId,password}=req.body;

        const user=await User.findOne({emailId:emailId});
      
        if(!user){
        throw new Error("Invalid Credentials");
       }

       const passwordchk=await bcrypt.compare(password,user.password);
          if(passwordchk){
            res.send("successfully login!...");
          }      
       else 
          throw new Error("Invalid Credentials");

    }catch(err){
   res.status(400).send("something went wrong "+ err.message)
}
})

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


app.patch("/user/:userID",async(req,res)=>{
     const userID=req.params?.userID;   
     const data=req.body;


    try{
       const update_allowed=[
            "firstName",
            "lastName",
            "password",
            "age",
            "gender",
            "skills"
         ];
    
      const isupdate_allowed=Object.keys(data).every((k) => 
                update_allowed.includes(k));
        
    if(!isupdate_allowed){
       throw new Error("update not allowed");
    };
   
    if(data.skills.length>10){
        throw new Error("skills should be less than 10");
    }

        await User.findByIdAndUpdate({_id:userID},data);
        res.send("user updated successfully!!..")

    }catch(err){
           res.status(400).send("something went wrong "+ err.message)
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
