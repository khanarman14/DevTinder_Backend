const mongoose =require('mongoose');

const connectionRequestSchema=new mongoose.Schema({

   toUserId:{
     type:mongoose.Schema.Types.ObjectId,
     required:true,
     ref:"User"
   },

   fromUserId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
   },
   status:{
    type:String,
    enum: {
        values: ['interested', 'notInterested','accept','reject'],
        message: '{VALUE} is not supported'
      },
      required:true
   }
},
{timestamps: true});

connectionRequestSchema.index({fromUserId:1,toUserId:1});

module.exports=mongoose.model("ConnectionRequest",connectionRequestSchema)
