const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  socket.on('move', (data) => {
    socket.broadcast.emit('move', { id: socket.id, x: data.x, y: data.y });
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('remove', socket.id);
  });
});

server.listen(3000);
