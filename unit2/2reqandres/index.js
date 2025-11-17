// understanding request and response objects => inside your http.createserver you get two objecs : req and res

/*

the req(request) object

the request object all information about incoming request from the user's browser

Analogy: Think of req as the order slip a customer hands you at a restaurant. It tells you everything you need to know:
.What table are they at? (req.url)
.Are they ordering, paying, or just asking a question? (req.method)
.Do they have any special allergies or requests? (req.headers)

the two most properties that will be used right away are : 
.if the go to http://localhost:3000/, req.url will be /
.if the go to http://localhost:3000/about, req.url will be /about
.if the go to http://localhost:3000/contact-us, rq.url will be /contact-us


req.method => this is a string spacifying the HTTP 'verb' or method used for now you will mostly see 'GET' (which means 'give me data', "like when you visit a webpage") and 'POST' ('which means i am sending you data', "like when you submit a form")

*/

/*

the response object => the response object is the tool you use to build and send your response back to the browser .

Analogy: Think of res as the tray you use to send the food back to the customer. You have to prepare the tray before you send it.

You set the status (e.g., "Order successful!" or "We're out of that dish.").

You set the content type (e.g., "This is food, not a drink.").

You put the food on the tray.

You send the tray to the table.

res.writeHead(statusCode, headers) (Optional, but good practice): This "prepares the tray."

statusCode: A number. 200 means "OK." 404 means "Not Found."

headers: An object. The most important one is 'Content-Type'. We set it to 'text/html' to tell the browser we're sending HTML, not just plain text.

res.write(data) (Optional): Lets you send chunks of data, like using a stream. You can call this multiple times.

res.end(data): This is the most important method. It must be called on every response. It signals "I'm done sending data." You can put your final data inside res.end() as a shortcut (which is what we did with res.end('Hello, World!')).

*/

const http = require('http');
const { type } = require('os');

const port = 3000;

const server = http.createServer((req, res) => {

    // 1. look at the url request
    const url = req.url;
    console.log(`Incoming request for : ${url}`); // see this in your terminal

    // 2. set the 'header' so the broweser should know we are sending html file
    // we are doing this for all the responses that's why we are doing it first

    // res.writeHead(200, {'Content-Type' : 'text/html'});

    // 3. simple routing => check which URL the user visited
    if(url === '/'){
        // homepage
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.write('<h1>Welcome to the Homepage!</h1>');
        res.end('Hellow World!');
    } else if(url === '/about'){
        // about
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.write('<h1>This is the about page!</h1>');
        res.end('<p>we are a test server.</p>');
    } else {
        // 404 not found
        res.writeHead(404, {'content-type' : 'text/html'});
        res.write('<h1>404 Not found</h1>');
        res.end('<p> Sorry the page doesnt exist </p>');
    }
});


server.listen(port, ()=> {
    console.log(`server is listening at : http://localhost:${port}`);
});

// for bigger website if/else will be not managable that's why we need to study express