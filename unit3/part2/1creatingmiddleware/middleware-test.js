const express = require('express');
const app = express();

// --- 1. Define the Middleware ---
const loggerMiddleware = (req, res, next) => {
    // log the current time and the URL requested
    const time = new Date().toISOString();
    console.log(`[${time}] Request received for: ${req.url}`);

    // CRITICAL: Call next () to pass the baton to the next runner
    next();
};


// --- 2. Use the Middleware globally ---
// app.use() means "Run this on EVERY request"
app.use(loggerMiddleware);

// --- 3. Define Routes ---
app.get('/', (req, res) => {
    console.log('Inside Homepage Handler');
    res.send('Home Page');
});

app.get('/about', (req, res) => {
    console.log('Inside About Handler');
    res.send('About Page');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});