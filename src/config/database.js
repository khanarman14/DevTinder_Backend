const mongoose = require("mongoose");



const connectDb = async ()=> {
 
    await mongoose.connect(
        'mongodb+srv://khanmdarmani696:wgFj4OF4iir4YXOB@namastedev.pqulj.mongodb.net/devTinder'
        );

};


module.exports={
    connectDb
}