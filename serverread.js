const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        fs.readFile('index.html', (err, data) => {
            if(err) {
                res.writeHead(500);
                res.end('Error loading HTML file');
            } else {
                res.writeHead(200, {'content-type':'text/html'});
                res.end(data);
            }
        });
    } else {
        
    }
})