const mongoose =require('mongoose');
const validator = require('validator');

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        minLength:4,
        maxLength:20,
        validate(value){
            if(!validator.isAlpha(value)){
             throw new Error("please enter valid first name"+ value)
            }
         }
        
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        maxLength:50,
        required:true,
        lowercase:true,
        trim:true,
        unique:true,
        validate(value){
           if(!validator.isEmail(value)){
            throw new Error("invalid email address "+ value)
           }
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8,
        maxLength:15,
        validate(value){
            if(!validator.isStrongPassword(value)){
             throw new Error("password is not strong "+ value)
            }
         }
    
    },
    age:{
        type:Number,
        min:18,
        required:true
    },
    gender:{
        type:String,
        required:true,
       enum: {
      values: ['male', 'female','other'],
      message: '{VALUE} is not supported'
    }
    },
    skills:{
        any:[]
    }

},{timestamps: true});

module.exports=mongoose.model("User",userSchema);