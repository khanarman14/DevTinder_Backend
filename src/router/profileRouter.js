const express = require('express');
const profileRouter =express.Router();
const {userAuth}=require('../middlewares/auth');
const User = require('../models/user');
const{updateAllowedValidation}=require("../utils/validation");


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
    




    }catch(err){
        res.status(400).send("something went wrong "+err.message);
    }
})


module.exports = profileRouter;