var express = require ('express');
var app = express();
var server = require('http').Server(app);
var io = require ('socket.io')(server);

var messages = [{
  id:1,
  text: "",
  author: "Victor Jesus :"
}]


app.use(express.static('public'))

app.get('/', function(req,res){
  res.status(200).send("hello world");
  });
  
io.on('connection',function(socket) {
    console.log('alguien se ha conectado con sockets');
    socket.emit('messages',messages);

    socket.on('new-message',function(data){
     messages.push(data);
     
     io.sockets.emit('messages', messages);
    });
  });

server.listen(8082, function(){
  console.log("servidor corriendo en http://localhost:8080");
});