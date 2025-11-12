// compressing and decompressing the data using zlib.

// Zlib is a core Node.js module used for data compression. Think of it as the engine inside "zipping" and "unzipping" programs.

// why use it => 1. Save Disk Space: Compressing large log files or backups can drastically reduce their size. 2. Faster Network Transfer: This is the most common use. When you visit a website, the server will often "gzip" the HTML, CSS, and JavaScript files before sending them. Your browser then "un-gzips" them. This is much faster than sending the large, uncompressed files.

// To compress (zip) => Readable Stream (source file) $\rightarrow$ Zlib Gzip Stream (compressor) $\rightarrow$ Writable Stream (destination .gz file)

// To decompress (unzip) => Readable Stream (source .gz file) $\rightarrow$ Zlib Gunzip Stream (decompressor) $\rightarrow$ Writable Stream (destination file)

const fs = require('fs');
const path = require('path');
const zlib = require('zlib'); // 1. impor the core module

// define file paths
const sourcePath = path.join(__dirname, 'user.json');
const compressedPath = path.join(__dirname, 'user.json.gz');

// create source and destination streams

const sourceStream = fs.createReadStream(sourcePath);
const writableStream = fs.createWriteStream(compressedPath);

// 3. create a zlib Gzip stream(the compressor)

const gzipStream = zlib.createGzip();

console.log('compressing user.json -> user.json.gz');

// 4. buile the pipeline

sourceStream.pipe(gzipStream) // send source data to compressor
.pipe(writableStream); // // Send compressed data into the new file

// 5. listen for the finish event
writableStream.on('finish', () => {
    console.log('File successfully completed');

    // (We'll add the decompression part here in a moment)

    // --- now let's decompress it to prove it worked ---

    console.log('\nDecompressing user.json.gz -> user_DECOMRESSED.json');

    const decompressedPath = path.join(__dirname, 'user_DECOMPRESSED.json');

    const compressedSource = fs.createReadStream(compressedPath);
    const decompressedDestination = fs.createWriteStream(decompressedPath);

    // Create a 'gunzip' stream (the decompressor)

    const gunzipStream = zlib.createGunzip();

    // build the decompression pipeling

    compressedSource.pipe(gunzipStream).pipe(decompressedDestination);

    decompressedDestination.on('finish', () => {
        console.log('File successfully decompressed');
    });
});

writableStream.on('error', (err) => {
    console.log('Writable stream ERROR: ', err);
});
sourceStream.on('error', (err) => {
    console.log('Readable stream ERROR: ', err);
});
gzipStream.on('error', (err) => {
    console.log('gzipstream ERROR: ', err);
});

