// working with JSON
// JSON -> javascript object Notation -> it's the single most important data format used in modern web development.

// what it is -> a text format that looks almost identical to a javascript object. it's how severs and clients(like browsers) exchange data. it's also a very common format for configuration files.

// why we need it -> You can't write a JavaScript object directly into a text file and expect it to work. Files only store text (strings).

// The Process -> We must convert our JavaScript object into a JSON string before saving it, and then parse that string back into an object when we read it.

// Node.js gives you two built-in methods for this, which are part of the global JSON object:

// 1. JSON.stringify(object): "String-ifies" your object. It turns a JavaScript object into a JSON string.

// 2. JSON.parse(string): "Parses" your string. It turns a JSON string back into a usable JavaScript object.

const fs = require('fs');
const path = require('path');

// 1. define our data (simple javascript object)

const user = {
    id : 1,
    username : 'sunny',
    course : 'backend',
    topic : ['Node.js', 'JSON', 'fs'],
};

// define the file path

const userFilePath = path.join(__dirname, 'user.json');

// step1 -> write the json file

// 2. Convert the object to a JSON string
// The 'null, 2' part is optional: it "pretty-prints" the JSON 
// with 2 spaces of indentation to make it human-readable.

const dataToWrite = JSON.stringify(user, null, 2);

console.log('writing user data to file...');
fs.writeFile(userFilePath, dataToWrite, (err) => {
    if(err){
        console.log('ERROR writing file :', err);
        return;
    }

    console.log('successfully wrote to user.json!');
    console.log('file content is :\n', dataToWrite);

    // --- Step 2: Read the JSON file ---
    // Now we read it back to prove it worked.

    console.log('\nReading user.json back...');
    fs.readFile(userFilePath, 'utf8', (err, dataFromFile) => {
        if(err){
            console.log('ERROR readind file : ', err);
            return;
        }

        console.log('row data from file (string) : \n', dataFromFile);

        // 3. parse the string back into an object

        try {
            const userObject = JSON.parse(dataFromFile);
            console.log('\n data parsed back into an object:');
            console.log(userObject);

            // now we can use it like normal object
            console.log(`Hello ${userObject.username}`);
        } catch(parseErr){
            console('ERROR parsin JSON:', parseErr);
        }
    });

    
});



