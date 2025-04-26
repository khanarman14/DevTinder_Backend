const express = require('express');
const authRouter = express.Router();
const User = require('../models/user');
const {signUpvalidation}=require('../utils/validation');
const bcrypt = require('bcrypt');



authRouter.post("/signup",async (req,res)=>{ 
           
    try{
       signUpvalidation(req);
       const {firstName,lastName,emailId,password} = req.body;
       const hashPassword= await bcrypt.hash(password,10)
      
       const user=new User({
            firstName,
            lastName,
            emailId,
            password:hashPassword

                });
          
         await user.save();
            res.send("sucessfully signup!..");

}

catch(err){
   res.status(400).send("error saving the user "+ err.message)
} 


});

authRouter.post("/login",async(req,res)=>{
    try{
          
        const{emailId,password}=req.body;

        const user=await User.findOne({emailId:emailId});
      
        if(!user){
        throw new Error("Invalid Credentials");
       }

       const passwordchk=await user.validatePassword(password);
          if(passwordchk){
            const cookieToken=await user.jwtSign();
            res.cookie("token",cookieToken, {
                expires: new Date(Date.now() + 8 * 3600000)}
              );
            res.send(user);
          }      
       else 
          throw new Error("Invalid Credentials");

    }catch(err){
   res.status(400).send("something went wrong "+ err.message)
}
});

authRouter.post("/logout",async(req,res)=>{
           res.cookie("token",null,{
            expires: new Date(Date.now())
           })
           res.send("logout Successfully");
})

module.exports = authRouter;
