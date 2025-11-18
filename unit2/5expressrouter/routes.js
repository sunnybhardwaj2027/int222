const express = require('express');
const router = express.Router(); // 1. create a router

// 2. define all the routes on the 'router' object

// HomePage route
router.get('/', (req, res) => {
    res.send('<h1>Welcome to the HomePage</h1>');
});

// About page Route
router.get('/about', (req, res) => {
    res.send('<h1>Welcome to the About Page</h1>');
});

// Login POST Route
router.post('/login', (req, res) => {
    console.log('Login data received: ', req.body);

    const { username } = req.body;
    res.send(`Welcome, ${username}`);
});

// export the router 
module.exports = router;