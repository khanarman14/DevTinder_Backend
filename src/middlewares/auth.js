const jwt = require('jsonwebtoken');
const User = require('../models/user');


const userAuth=async(req,res,next)=>{
     try{   
      const cookie=req.cookies;
      const{token}=cookie;
       if(!token){
         throw new Error("unauthorized error")
       }
       const {_id}=jwt.verify(cookie.token,'DevTinder123');
        
        const user=await User.findById({_id:_id});
      
        if(!user){
          throw new Error("user not found")
                } 

         res.locals.user=user;
         next();
        
               
                } catch(err){
                  res.status(400).send("something went wrong "+ err.message)
                   }

};
    
  module.exports= {
       userAuth,
       };