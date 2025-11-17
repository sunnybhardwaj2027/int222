// basic website with node.js

// 1. introducing express => Express.js (or just "Express") is the most popular, fast, and unopinionated backend framework for Node.js.

// It's not a new language. It's just a Node.js "third-party module" that you install, like we installed chalk.

// It's a "framework." This means it's a pre-built toolkit that gives you a set of powerful, easy-to-use tools to handle all the annoying parts of building a web server.

/*

analogy: building a server

Using the http Module (What we just did): This is like building a car from scratch. You have to get the raw metal, weld the frame, build the engine, and connect all the wires yourself. It's powerful, but very, very difficult and slow.

Using Express: This is like getting a pre-built car chassis. The engine, wheels, and steering are already connected and work perfectly. You just need to add the "fun" parts, like the body color, the seats, and the stereo.

*/

/*

express handles all the hard parts for you like 

Routing: No more giant if (req.url === ...) blocks. Express gives you a clean way to handle routes.

Middleware: (This is in Unit III) A simple way to run code on every request, like checking if a user is logged in.

Parsing Data: Easily handles JSON data, form data, etc.

*/

// installing Express => since express is a third party module we need to install it using npm, make sure you are in correct folder and if your server is still running the firstly stops it and run 'npm install express'

// You'll see that npm adds express to your package.json file. Your project now depends on Express.

// let's build a server in express => let's rebuild our entire server from the last lesson, but this time using Express. You'll be shocked at how much simpler it is.

// 1. import express
const express = require('express');

// 2. create the express 'app' 
// this 'app' object is our entire server
const app = express();
const port = 3000;

// 3. create our routes('this is magic')
// no more if/else block

// Homepage Route
// app.get(URL, callback_function)
app.get('/', (req, res) => {
    // 'res.send()' is an Express shortcut.
    // It automatically sets the Content-Type and status code (200).

    res.send('<h1>Welcome to homepage(from express)</h1>');
});

app.get('/about', (req, res) => {
    res.send('<h1>This is the About Page</h1><p>We are a test server.</p>');
});

// 4. handle 404 pages
// this app.use() runs for any request that didn't match any route above it. it *must* be at the end

app.use((req, res) => {
    // 'res.status()' is an Express shortcut to set the status
    res.status(404).send('<h1>404 Not Found</h1><p>Sorry, that page does not exist.</p>');
});

// 5. start the sever
app.listen(port, () => {
    console.log(`Express server is runnig on : http://localhost:${port}`);
});



