const express = require('express');
var app = express();
var mongoose = require('mongoose');
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const path = require('path');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
const multer = require('multer')

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const formateMessage = require('./utility/message');

const indexRoute = require('./routes/index')
const User = require('./Models/user')


const {userJoin,getCurrentUser,userLeave,getRoomUsers} = require('./utility/users')

mongoose.connect('mongodb://localhost/project1',{useNewUrlParser : true} , (error)=>{
  if(error){
    console.log(error)
  }else{
    console.log('Connecting to DB .....')
  }
  
})

app.use(express.json()); // Used to parse JSON bodies


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.ejs');


app.use(express.static(path.join(__dirname, '/public/')));
app.use('/images',express.static(path.join(__dirname, '/images/')));


//require('./config/chat')

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



// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + '-' + file.originalname);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === 'image/png' ||
//     file.mimetype === 'image/jpg' ||
//     file.mimetype === 'image/jpeg'
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

const fileStorage = multer.diskStorage({
  destination:(req,file,callback)=>{
    callback(null,'images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  }
});

const fileType = (req,file,callback) => {
  if(file.mimetype === 'image/png' ,
   file.mimetype === 'image/jpg' 
  , file.mimetype === 'image/jpeg'  ){
  callback(null , true)
  }else{
  callback(null,false)
  }
  }


app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ storage: fileStorage , fileFilter:fileType }).single('image'));



app.post('/api/photo',function(req,res){
  upload(req,res,function(err) {
     
      if(err) {
          return res.end("Error uploading file.");
      }
      res.end("File is uploaded");
  });
});

app.use(session({
  name: 'sessionId',
  secret: "mysecretkeythatiwillnottellyou",
  saveUninitialized: false, // don't create sessions for not logged in users
  resave: false, //don't save session if unmodified
  
  // Where to store session data
  /*store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 1 * 24 * 60 * 60 // = 14 days. ttl means "time to live" (expiration in seconds)
  }),*/

  // cookies settings
  cookie: {
    secure: false,  
    httpOnly: false, // if true, will disallow JavaScript from reading cookie data
    expires: new Date(Date.now() + 60 * 60 * 1000) // 1 hour;
  }
}))
// Passport Config
require('./config/passport')(passport); // pass passport for configuration
// Passport init (must be after establishing the session above)
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use((req, res, next)=>{
  // Make `user` and `authenticated` available in templates
  res.locals.user = req.user
  next()
})


app.use('/',indexRoute);

server.listen(3000, function(){
    console.log('Port Successful');
}



)

