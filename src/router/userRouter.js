const express = require('express');
const userRouter =express.Router();
const ConnectionRequest=require('../models/connectionRequest')
const {userAuth}=require('../middlewares/auth');
const User = require('../models/user');



userRouter.get("/user/request/received",userAuth,async(req,res)=>{
    try{
        const loggnedInUser=res.locals.user._id;


          const data=await ConnectionRequest.find({
            toUserId:loggnedInUser,
            status:"interested"
          }).populate("fromUserId",["firstName","lastName","about","photoUrl","age","gender"])

         res.send(data);    


    }catch(err){
        res.status(400).send("ERROR "+err.message);
    }
})

userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
           const loggnedInUser=res.locals.user._id;
         
         
          
           const data=await ConnectionRequest.find(
            { 
                $or:[
                    
                    { toUserId:loggnedInUser,status:"accept"},
                    { fromUserId:loggnedInUser,status:"accept"}

                ]
            }).populate("fromUserId",["firstName","lastName","photoUrl","about"]).populate("toUserId",["firstName","lastName","photoUrl","about"])
                
              
              const connectionData=data.map((row)=>
              {
                if(row.toUserId._id.toString()===loggnedInUser.toString()){

                  return  row.fromUserId
                }
              return  row.toUserId
     } )
      
           res.json({
        connectionData
         })
        




    }catch(err){
        res.status(400).send("ERROR "+ err.message);
    }
})


userRouter.get("/feed",userAuth,async(req,res)=>{
    try{
          const limit=req.query.page || 10 ;
          const page=req.query.page || 1 ;
          const skip= (page-1)*10   ;

          const loggnedInUser=res.locals.user._id
         
          const userConnection=await ConnectionRequest.find({
                 $or:[
                    {toUserId:loggnedInUser},
                    {fromUserId:loggnedInUser}
                 ]
          })
         
          const hideUserFeed = new Set();
          userConnection.forEach((key)=>{
            hideUserFeed.add(key.fromUserId.toString());
            hideUserFeed.add(key.toUserId.toString());
          })
       
         const showUserFeed= await User.find(
            
              {
                _id:{$nin:Array.from(hideUserFeed)}
              }
            
        ).skip(skip).limit(limit);

          res.send(showUserFeed);

    }catch(err){
        res.status(400).send("ERROR "+err.message)
    }
})


module.exports= userRouter;