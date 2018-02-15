//idea for making multiplayer square wars
//still in very early stages
//need to figure out how to push and display page with players...
const express = require('express');
const http = require('http');
const socketIO = require(socket.io);
const publicPath = path.join(__dirname, '...views');
const port = 3000;
var {Player} = require('./models-multiplayer/player');
var {playerHolder, playerMatch} = require('./player-holder');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.on('join', (parms, callback) => {
    if(!parms.name) {
      return ballback('Need name to play');
    }
    new Player(parms.name);
    playerHolder(parms.name);
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  })
});

server.listen(port, () => {
  console.log("Server now running...");
});
