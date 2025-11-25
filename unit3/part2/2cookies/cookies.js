const express = require('express');
const cookieParser = require('cookie-parser'); // 1. import it 

const app = express();

// 2. use the middleware
app.use(cookieParser());

// Route to SET a cookie
app.get('/login', (req, res) => {
    // res.cookie(name, value)
    // This sends a header telling the browser to save this data

    res.cookie('username', 'sunny');
    res.cookie('role', 'admin');
    res.send('Cookie has been set! check your browser storage.');
});

// Route to set to READ cookies
app.get('/profile', (req, res) => {
    // 3. Access cookies using req.cookies
    console.log(req.cookies);

    const { username, role } = req.cookies;

    if(username){
        res.send(`Welcome back, ${username}! You are an ${role}`);
    } else {
        res.send("I don't know you. please go to /login first.");
    }
});

// Route to DELETE a cookie
app.get('/logout', (req, res) => {
    res.clearCookie('username');
    res.clearCookie('role');
    res.send('Cookies cleared. You are logged out.');
});

app.listen(3000, () => console.log('server running on port 3000'));

