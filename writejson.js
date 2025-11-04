const fs = require('fs');

// step 1: create a javascript object
const student = {
    name : "monika",
    age : 22, 
    course : "Node.js",
    city : "pune"
};

// step 2: convert object to JSON string
const jsonData = JSON.stringify(student, null, 2); // (null, 2) for pretty format

// step 3: write JSON to file
