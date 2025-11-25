const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
// 1. create a raw HTTP server passing our Express 'app' to it
const server = http.createServer(app);
// 2. create the Socket.IO server attached to that HTTP server
const io = new Server(server);

// server the html file (we will create this next)
app.get('/', (req, res) => {
    res.sendFile((__dirname + '/index.html'));
});

// --- SOCKET.IO LOGIC ---
io.on('connection', (socket) => {
    console.log('A user Connected: ', socket.id);

    // listen for chat messages from THIS client
    socket.on('chat message', (msg) => {
        console.log('Message received: ' + msg);

        // Broadcast message to everyone connected (including the sender)
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


// IMPORTANT: Listen on 'server', not 'app'
server.listen(3000, () => {
    console.log('chat server running on http://localhost:3000');
});

// keyconcept: io.emit vs socket.send
// socket.send(used in ws) sends a message to specific person.
// io.emit (used here ) sends a message to everyone connected. this is how user A's message shows up on user B's screen

// step 3 => The Frontend code(index.html) => we need a user Interface
