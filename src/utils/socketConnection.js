const { Server }= require("socket.io");


const socketConnection=(httpServer)=>{
   const io = new Server(httpServer, {
      cors:{
        origin:"http://localhost:5173",
      },
});

 io.on("connection", (socket) => {
     socket.on('joinChat',({targetUserId,userId})=>{
          const roomId=[targetUserId,userId].sort().join("&*")
          socket.join(roomId)
     })
     socket.on('sendMessage',( {
                firstName,
                userId,
                targetUserId,
                text
            })=>{
                const roomId=[targetUserId,userId].sort().join("&*");
                io.to(roomId).emit('messageReceived',{firstName,text})
            })
     socket.on('disconnect',()=>{})
})

}

module.exports={
    socketConnection
}