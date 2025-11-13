// Excellent. This is where the real fun begins. In Unit I, we learned how to work with files on our computer. In Unit II, we'll learn how to make our computer act as a web server so it can communicate with anyone in the world over the internet.

/*

1. Introduction to the HTTP module
What is HTTP? HTTP stands for Hypertext Transfer Protocol. It's the language of the web. When your browser (the "client") wants a webpage, it sends an HTTP Request to a server (e.g., "GET me your homepage"). The server then sends back an HTTP Response (e.g., "Here is the HTML for the homepage").

What is the HTTP module? The http module is a core module in Node.js, just like fs and path. Its one main job is to give you the tools to create an HTTP server.

Analogy: The Phone Operator

Think of the http module as a phone operator for your computer.

http.createServer() sets up the operator's desk.

server.listen() "plugs in" the phone line to a specific port (like an extension number, e.g., 3000) and tells the operator to start listening for calls.

When a call (an HTTP Request) comes in, the operator (your server) answers it, performs a task, and gives a response (the HTTP Response).

*/


/*

2. Setting up a basic HTTP server
There are two main functions you need:

http.createServer(callback): This creates a new server object. The callback function you pass to it is the most important part. This function runs every single time a new request hits your server.

This callback function always takes two arguments: req (the Request) and res (the Response).

server.listen(port, callback): This tells the server to "listen" for incoming connections on a specific port (a "digital door" on your computer).

A port is just a number. Port 80 is the default for HTTP, but we'll use a test port like 3000.

The callback function is optional and just runs once the server is successfully running.

*/

// 1. Import the core http module
const http = require('http');

const port = 3000; // The port we want to listen on

// 2. Create the server
// This callback function runs for EVERY request
const server = http.createServer((req, res) => {
  
  // 'req' (Request) has info about the incoming request
  // 'res' (Response) is what we use to send a response back
  
  // 3. Send a simple response
  res.end('Hello, World!'); 
});

// 4. Start the server
// It will listen on http://localhost:3000
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});