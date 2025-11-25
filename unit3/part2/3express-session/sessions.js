const express = require('express');
const session = require('express-session'); // 1. import

const app = express();

// 2. configue session middleware
app.use(session({
    secret: 'my-secret-key', // used to sign the session ID cookie (make it un-fakable)
    resave: false,
    saveUninitialized: true
}));

app.get('/count', (req, res) => {
    // 3. use req.session to store ANY data
    // this data lives on the SERVER memory, not the browser

    if(req.session.views){
        req.session.views++;
        res.send(`You have visited this page ${req.session.views} times.`);
    } else {
        req.session.views = 1;
        res.send("Welcome! this is your first visit.");
    }
});

app.listen(3000, () => console.log('server is running on port 3000'));
