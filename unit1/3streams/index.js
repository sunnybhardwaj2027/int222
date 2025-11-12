// using stream module to stream data.

// we have used fs.readFile() upto this point but this has a hidden problem => It reads the entire file into your computer's RAM (memory) before it calls your callback function, If the file is small (like our user.json), this is fine, If the file is huge (like a 5GB video file or a 10GB log file), your program will use 5GB or 10GB of RAM. It will likely crash your server.

// stream is a way to handle data in small managreable 'chunk'.

const fs = require('fs');
const path = require('path');

const userFilePath = path.join(__dirname, 'user.json');

const readableStream = fs.createReadStream(userFilePath, { encoding : 'utf8'});

let chunkNumber = 1;

readableStream.on('data', (chunk) => {
    console.log(`--- CHUNK ${chunkNumber} ---`);
    console.log(chunk);
    chunkNumber++;
});

readableStream.on('end', () => {
    console.log('\n--- stream ended ---');
    console.log('Finished reading File');
});

readableStream.on('error', (err) => {
    if(err){
        console.log('ERROR reading stream : ', err);
    }
});