const express = require('express');
const chatRouter = express.Router();
const Chat =require('../models/Chat');
const {userAuth}=require('../middlewares/auth');

chatRouter.get('/chat/:targetUserId',userAuth,async(req,res)=>{
       const userId=res.locals.user._id;
       const {targetUserId}=req.params;
    try{
                
         let chat=await Chat.findOne({participants:{$all:[targetUserId,userId]}}).populate({
            path:'messages.senderId',
            select:"firstName"
         });

           if(!chat){
          chat=new Chat({
          participants:[targetUserId,userId],
          messages:[],
                 })}
                    
       await chat.save();
             
      res.json(chat);


    }catch(err){
        console.log(err)
    }
})


module.exports = chatRouter;