const fs = require('fs');

fs.writeFileSync('hello.txt', 'hello from Node.js!');

const data = fs.readFileSync('hello.txt', 'utf-8');

console.log(data);