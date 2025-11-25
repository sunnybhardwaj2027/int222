// creating basic websocket server => to do this in Node.js, we use a library called 'ws'. it is the most basic, lightweight implementation of websocket protocol.

// 1. installing the library => we need to install the 'ws' package(note:- this is differenct from 'socket.io', which comes later in the syllabus. ws is the raw, standard version) => npm install ws

// code:-

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

/* testing the server

since we have not built a frontend website yet, testing a websocket server is a bit trick. you can't just put ws://localhost8080 in your chrome address bar

we need a webSocket client

Option A: Use an Online Tester (Easiest)

Run your server: Go to your terminal and run node server.js.

Go to this URL: piesocket.com/websocket-tester (or any similar online tool).

Enter your address: ws://localhost:8080 (Note: It is ws://, not http://)

Click Connect.

What happens next:

Connection: You will see "A new client connected!" in your VS Code terminal.

Welcome: On the website, you will see the message: "Welcome to the WebSocket server! You are connected."

Chat: Type "Hello Node!" on the website and hit Send.

Your terminal will show: "Received from client: Hello Node!"

The website will receive the reply: "Server received your message: Hello Node!"

*/

// 4. sending and receiving messages(code breakdown)

// --- socket.send('string')
/*
what it does => pushes data from server to client
direction => server -> client
timing => can happen anytime (eg:= immediately on action, or inside a timeout)
*/

// --- socket.on('message', callback)
/*
what it does => listens for data coming from client to server.
direction => client->server
important => The message data often comes as a "Buffer" (raw binary data). That is why we used .toString() in the code (message.toString()) to make it readable text.
*/
