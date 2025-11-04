const fs = require('fs');

fs.readFile('data.json', 'utf8', (err, data) => {
    if(err){
        console.log("Error reading file:", err);
        return;
    }

    const user = JSON.parse(data);
    console.log("user name:", user.name);
    console.log("City:", user.city);
});