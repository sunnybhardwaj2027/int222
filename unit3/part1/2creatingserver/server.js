// creating basic websocket server => to do this in Node.js, we use a library called 'ws'. it is the most basic, lightweight implementation of websocket protocol.

// 1. installing the library => we need to install the 'ws' package(note:- this is differenct from 'socket.io', which comes later in the syllabus. ws is the raw, standard version) => npm install ws






//1. import the websocket library

const webSocket = require('ws');

//2. create a websocket server on port 8080
// we use 8080 to avoid conflicting with our express app on 3000
const wss = new webSocket.Server({port : 8080});

console.log(`WebSocket Server is running on port 8080`);

//3. THE EVENT LOOP
// the 'connection' event fires whenever a new client connect to us.
// the 'socket' object represents that specific client

wss.on('connection', (socket) => {
    console.log('A new client connected!');

    // A. SENDING MESSAGES
    // we can send data to client immediately
    socket.send('Welcome to the websocket server! you are now connected.');

    // B. RECEIVING MESSAGES
    // we listen for the 'message' event from THIS specific client.
    socket.on('message', (message) => {
        console.log('Received from client: ', message.toString());

        // let's reply back to them 
        socket.send(`server received you message: ${message}`);
    });

    // c. DISCONNECTING
    // this fires when the client closes the tab or loses internet
    socket.on('close', () => {
        console.log('client disconnected');
    });
});