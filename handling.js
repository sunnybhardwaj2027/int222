const http = require('http');

const server = http.createServer((req, res) => {
    if(req.method === 'POST' && req.url === '/data'){
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString(); // convert buffer to string
        });

        req.on('end', () => {
            res.writeHead(200, {"content-type" : 'application/json'});
            res.end(JSON.stringify({message : 'Data received', data : body}));
        });
    } else {
        res.writeHead(404, {'content-Type' : 'text/plain'});
        res.end('Not found');
    }
});

server.listen(5000, () => console.log('server runnint at http://localhost:5000/'));