
const adminAuth = (req,res,next)=>{
    // console.log("On the route 1")
      const token="xyz"
      const isAdminAuthorized = token =="xyz";
      if(!isAdminAuthorized){
         res.status(401).send("admin not  authorized")
         
      }
      else {
         next();
      }
       };
    
  module.exports= {
         adminAuth,
       };