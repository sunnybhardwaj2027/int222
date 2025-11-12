// The Power of pipe() => The real magic of streams is "piping." The pipe() method is a shortcut that takes the output of one stream (a Readable stream) and "pipes" it directly into another (a Writable stream).

// imagine you want to copy 5GB data => bad way - fs.readFile() (loads 5GB into RAM) -> fs.writeFile() (writes 5GB from RAM), good way - piping


const fs = require('fs');
const path = require('path');

const originalFilePath = path.join(__dirname, 'user.json');

const copyFilePath = path.join(__dirname, 'user_COPY.json');

// 1. create readable stream (source)
const readableStream = fs.createReadStream(originalFilePath);

// 2. create writable stream (destination)
const writableStream = fs.createWriteStream(copyFilePath);

// 3. use pipe to connect them
// this one command does all the work
console.log('Copying file using streams....');
readableStream.pipe(writableStream);

// we can listen for 'finish' event on *writable* streams.
writableStream.on('finish', () => {
    console.log('-- file copy completed --');
});

readableStream.on('error', (err) => {
    if(err){
        console.log('readable stream ERROR: ', err);
    }
});

writableStream.on('error', (err) => {
    if(err){
        console.log('writable stream ERROR: ', err);
    }
});