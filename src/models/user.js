const mongoose =require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        minLength:4,
        maxLength:20,
        validate(value){
            if(!validator.isAlpha(value)){
             throw new Error("please enter valid firstname "+ value)
            }
         }
        
    },
    lastName:{
        type:String,
        validate(value){
            if(!validator.isAlpha(value)){
             throw new Error("please enter valid lastname "+ value)
            }
         }
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
        validate(value){
            if(!validator.isStrongPassword(value)){
             throw new Error("password is not strong "+ value)
            }
         }
    
    },
    age:{
        type:Number,
        min:18
        
    },
    gender:{
        type:String,
       enum: {
      values: ['male', 'female','other'],
      message: '{VALUE} is not supported'
    }
    },
    
   skills: [{

    type: String

}]
      

},{timestamps: true});

userSchema.methods.jwtSign=async function(){
    const user=this;
      
    const token= await jwt.sign({_id:user._id},"DevTinder123");
    return token;
};

userSchema.methods.validatePassword=async function(userPasswordInput){
     const user=this;

    const isPaswordValid=await bcrypt.compare(userPasswordInput,user.password);
    return isPaswordValid;
}
module.exports=mongoose.model("User",userSchema);