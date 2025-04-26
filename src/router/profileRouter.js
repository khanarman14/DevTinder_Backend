const express = require('express');
const profileRouter =express.Router();
const {userAuth}=require('../middlewares/auth');
const User = require('../models/user');
const{updateAllowedValidation}=require("../utils/validation");
const validator = require('validator');
const bcrypt = require('bcrypt');


profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
         const user=res.locals.user;         
          res.send(user);
    }
    catch(err){
   res.status(400).send("something went wrong "+ err.message)
    }
});

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
try{
    
   if(!updateAllowedValidation(req)){
    throw new Error("update not allowed");
       }
   
       const lognedInUser=res.locals.user;
     
       Object.keys(req.body).forEach((key)=>{
         lognedInUser[key]=req.body[key]
    });

    await lognedInUser.save();

      res.send("successfull")





}catch(err){
    res.status(400).send("something went wrong "+ err.message);
}

}); 

profileRouter.patch("/profile/updatePassword",userAuth,async(req,res)=>{
    try{
         const{currentPassword,newPassword}=req.body;
         const user=res.locals.user;


         if(!newPassword){
            throw new Error("password is not valid");
         }
 
          if(!validator.isStrongPassword(newPassword)){
              throw new Error("password  is not strong")
            }

         const passwordchk=await user.validatePassword(currentPassword);
         
         if(!passwordchk){
              throw new Error("current password is not correct");
          }
          
          const newHashPassword=await bcrypt.hash(newPassword,10);
         
          user.password=newHashPassword;
          await user.save();

          res.cookie("token",null,
               {
                expires: new Date(Date.now())
               }
          )


      res.send("password change successfully");

    }catch(err){
        res.status(400).send("something went wrong "+err.message);
    }
})


module.exports = profileRouter;