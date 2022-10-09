const express = require('express');
var app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


const userName = 'Ahmad'

    io.sockets.on('connection', function(socket){
  //console.log(socket)

  socket.on('joinRoom' , ({username , room}) => {

    const user = userJoin(socket.id,username,room);

    socket.join(user.room)

    socket.to(user.room).emit('message',formateMessage(user.username,'welcome to chat'))


    socket.on('chatMessage' , (msg) => {

      const user = getCurrentUser(socket.id)

      io.to(user.room).emit('message',formateMessage(user.username,msg))
  
    })


    io.to(user.room).emit('roomUsers',
    {
      room: user.room,
      users: getRoomUsers(user.room)

    }
    
    )

  })


    socket.on("disconnect", () => {
      const user = userLeave(socket.id);
  
      if (user) {
        io.to(user.room).emit(
          "message",
          formateMessage(userName, `${user.username} has left the chat`)
        );
  
        // Send users and room info
        io.to(user.room).emit("roomUsers", {
          room: user.room,
          users: getRoomUsers(user.room),
        });
      }
  
  })

});