const http = require('http');

const server = http.createServer((req, res) => {
    if(req.urs === '/' && req.method === 'GET') {
        res.end('Welcome to Home Page');
    } else if (req.url === '/about' && )
})