const fs = require('fs');
const path = require('path'); // a core module for working with paths

//define the path of our new folder
const newFolderPath = path.join(__dirname, 'my-new-folder');
// define the path of our new file
const newFilePath = path.join(newFolderPath, 'new-message.txt');

// --- step1 -- creating a directory
console.log("Creating Directory...");

fs.mkdir(newFolderPath, (err) => {
    if(err){
        // it's ok if folder allready exists.
        if(err.code == 'EEXIST'){
            console.log('Folder Already Exists...');
        } else {
            console.log('Error creating Directory: ', err);
            return;
        }
    } else {
        console.log('Successfully created Directory: my-new-folder');
    }

    // --- step2 ---  write a new file inside the directory
    console.log('Writing file...');
    const fileContent = 'This is a brand new file...';

    fs.writeFile(newFilePath, fileContent, (err) => {
        if(err){
            console.log('ERROR writing file...', err);
            return;
        } 
        console.log('successfully wrote file: new-message.txt');
    });

    // --- step3 --- deleting file
    console.log('deleting file...');
    fs.unlink(newFilePath, (err) => {
        if(err){
            console.log("ERROR deleting file : ", err);
            return;
        }
        console.log('new-message.text deleted successfully...');
    })
});

