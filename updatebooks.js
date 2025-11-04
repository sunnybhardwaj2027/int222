const fs = require('fs');

fs.readFile('books.json', 'utf8', (err, data) => {
    if(err) {
        console.log("error reading file:", err);
        return;
    }

    let books = JSON.parse(data);

    books.array.forEach(book => {
        if(book.title === "Node.js Guide"){
            book.price = 500;
        }
    });
})