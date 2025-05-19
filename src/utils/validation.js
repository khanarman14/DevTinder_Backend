const validator = require('validator');

const signUpvalidation=(req)=>{
       const {firstName,lastName,emailId,password}= req.body;

    if(!firstName || !lastName){
        throw new Error("name is not valid");
    }

    else if(!validator.isEmail(emailId)){
        throw new Error("email id is not valid");
    }

    else if(!validator.isStrongPassword(password)){
        throw new Error("password  is not valid");
    } 
}

const updateAllowedValidation=(req)=>{

    const update_allowed=[
        "firstName",
        "lastName",
        "age",
        "gender",
        "about",
        "photoUrl",
        "skills"
     ];

     const isupdate_allowed=Object.keys(req.body).every((k) => 
        update_allowed.includes(k));

     if(req.body.skills.length>50){
        throw new Error("skills should be less than 50");
      }

    return isupdate_allowed;


}

module.exports={
    signUpvalidation,
    updateAllowedValidation
}