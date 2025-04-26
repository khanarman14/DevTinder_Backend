const express = require('express');
const connectionRouter =express.Router();
const ConnectionRequest=require('../models/connectionRequest')
const {userAuth}=require('../middlewares/auth');
const User = require('../models/user'); 

connectionRouter.post("/request/send/:status/:userId",userAuth,async(req,res)=>{
try{
         const fromUserId=res.locals.user._id;
         const toUserId=req.params.userId;
         const status=req.params.status;
         const validStatus=["interested","notInterested"]

        const isValidStatus=validStatus.includes(status);
        if(!isValidStatus){
            return res.json({
                message:"invalid status request"
            })
        }
         if(fromUserId==toUserId){
            return res.json({
                message:"cannot send connection request to yourself"
            })
         }
        const validToUserId=await User.findById({_id:toUserId})
         
           if(!validToUserId){
            return res.json({
                message:"invalid connection request"
           })
           }
     const duplicateRequest=await ConnectionRequest.findOne({
         $or: [
          {toUserId:toUserId,fromUserId:fromUserId},
          {toUserId:fromUserId,fromUserId:toUserId}   
  ]
   })

     if(duplicateRequest){
        return res.json({
            message:"request already sent"
        })
         }


         const connectionRequest=new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
       })

     await connectionRequest.save();

     res.json({
        "message":"request sent connection request successfully",
        "Data":connectionRequest
     })

}catch(err){
    res.status(400).send("something went wrong "+ err.message);
}


})


connectionRouter.post("/request/review/:status/:requestId", userAuth,async(req,res)=>{
 try{
    const loggedInUser=res.locals.user._id;
    const {status,requestId}=req.params;
    const validStatus=["accept","reject"]
   
    const isValidStatus=validStatus.includes(status);
        if(!isValidStatus){
            return res.json({
                message:"invalid status request"
            })
        }
   
        const validConnection=await ConnectionRequest.findOne({
            _id:requestId,
            toUserId:loggedInUser,
            status:"interested"
        })
   
        if(!validConnection){
           return res.json({
               message:"connection request not found"
           })
            }
  
            validConnection.status=status;

          const data=  await validConnection.save();
             
      res.json({
        message:"connection "+status+"ed"+ " successfully",
        data
      })



             
  }catch(err){
         res.status(400).send("Error "+ err.message);
  }



})


module.exports = connectionRouter;