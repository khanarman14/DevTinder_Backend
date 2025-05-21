const { Server }= require("socket.io");
const Chat =require('../models/Chat')


const socketConnection=(httpServer)=>{
   const io = new Server(httpServer, {
      cors:{
        origin:"http://localhost:5173",
      },
});

 io.on("connection", (socket) => {
try{
                       socket.on('joinChat',({targetUserId,userId})=>{
          const roomId=[targetUserId,userId].sort().join("&*")
          socket.join(roomId)
     })
     socket.on('sendMessage',async({firstName,userId,targetUserId,text})=>{
                const roomId=[targetUserId,userId].sort().join("&*");
                     let chat=await Chat.findOne({participants:{$all:[targetUserId,userId]}});
                     
                     if(!chat){
                        chat=new Chat({
                           participants:[targetUserId,userId],
                           messages:[],
                        }
                        )
                     }
                      chat.messages.push({
                            senderId:userId,
                            text
                        });
                        await chat.save();
                       io.to(roomId).emit('messageReceived',{firstName,text})
            })
                  socket.on('disconnect',()=>{})
}
                
catch(err)      {
                    console.log(err)
                }

              
})

}

module.exports={
    socketConnection
}