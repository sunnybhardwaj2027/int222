// index.js file is getting crowded with routes like /, /about, /login etc..., imagine a real website with more the 50 routes --- you main file would become 1000-line mess

// express.router => it's the way to solve it..

// 1. express.Router => an express.Router is like 'mini-app' or sub-folder for your routes. it lets you group related routes togethere in their own files. keeping you main index.js file clean and organized

/*

Analogy: the office building

index.js (Your App): This is the main lobby of your office building. Its only job is to direct people to the right floor. It shouldn't have random desks in it.

express.Router: This is a specific floor in the building (e.g., the "Sales Department" floor or the "User Accounts" floor).

Routes (/login, /profile): These are the individual offices on that floor.

You create a router file (e.g., userRoutes.js), put all the user-related routes in it, and then tell your main index.js file to use that router.

*/

// 2. code example => refactoring our route => let's clean up our project, we will create a new file for all our main routes

// step1 -> create a new file => in the same folder as index.js, create a new file named routes.js

// step2 -> write the code for routes.js => notice it's similar to index.js but it uses router instead of app

/*

visit route.js 

*/

const express = require('express');
const app = express();
const port = 3000;

// 1. import your new router
const mainRoutes = require('./routes.js');

// --- middlewares---
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// 2. 'plug in' the router
// tell the app to use main route for any URL

app.use(mainRoutes);

// --- 404 handler(must be at the end) ---
app.use((req, res) => {
    req.status(404).send('<h1>404 not found</h1>');
});

// 3. start the server 
app.listen(port, () => {
    console.log(`Express sever is running on http://localhost:${port}`);
})

