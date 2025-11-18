// 1. GET and POST requests => in http there are several 'methods' or 'verb' that tells the server what kind of action the user wants to perform. the two most important are 'GET' and 'POST'

/*

'GET' request

what it is => a request to 'get' or 'retrieve' data from the sever.
analogy => you are asking a librarian for specific book.
when it's used => every time you type a url in your browser, click a link or refresh the page
the code => app.get('/', ...)

*/

/*

'POST' request

what it is => a request to send, submit, or create new data on server.
analogy => you are filling out a form to give librarian a new book to add to the library
when it's used => when you submit a login form, create a new social media post, or sign up for the account.
the code => app.post('/login', ...)

*/

// The key difference is that GET requests just retrieve data, while POST requests usually change something on the server (like creating a new user or adding a new post).

// 2. body-parser(and how to handle POST data)

/*

This leads to a new problem. If a POST request is sending us data (like a username and password), how do we read that data on our server?

The data is sent in the "body" of the HTTP request. By default, Express doesn't know how to read this body.

This is where body-parser comes in. It's a middleware (a helper that runs in the middle) that intercepts the request, "parses" the body data, and attaches it to the req object as a clean JavaScript object called req.body.

Important Note: In modern Express (like you're using), you do not need to install body-parser as a separate package. It's now built directly into Express.

You just need to tell your app to use it.

*/

const express = require('express');
const app = express();
const port = 3000;

// --- add the body-parser ---
// this tells the express to parse incoming JSON data
app.use(express.json());
// this tells the express to parse incoming form data(eg. from an html form)
app.use(express.urlencoded({extended : true}));

// --- GET routes(for retrieving data) ---
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Home page!</h1>');
});

app.get('/about', (req, res) => {
    res.send('<h1>This is the about page</h1>');
});

// --- POST routes(for submitting data) ---
app.post('/login', (req, res) => {
    // Because we used app.use(), the body data is now on req.body
    console.log('Login data retrieved:');
    console.log(req.body);

    // let's grab the username and password from the body
    const username = req.body.username;
    const password = req.body.password;

    res.send(`Welcome, ${username}! you tried to log in.`);
});

// 404 handler must be at the end
app.use((req, res) => {
    req.status(404).send('<h1>404 not found</h1>');
});

app.listen(port, () => {
    console.log(`Express server is running on http://localhost${port}`);
});

/* 

how to test this

You cannot test a POST request by just typing a URL in your browser (that's a GET request). You need a special tool to send a POST request.

The most popular tool for this is Postman.

Download and open Postman.

Set the request type to POST (instead of GET).

Set the URL to http://localhost:3000/login.

Go to the "Body" tab.

Select "raw" and "JSON".

Type this in the body:

JSON

{
  "username": "ashut",
  "password": "123"
}
Click "Send".

You will see the response Welcome, ashut! You tried to log in. in Postman. And in your Node.js terminal, you will see:

Login data received:
{ username: 'ashut', password: '123' }

*/