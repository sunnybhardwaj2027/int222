const fs = require('fs');

fs.readFile('students.json', 'utf8', (err, data) => {
    if(err){
        console.log("Error reading file", err);
        return;
    }

    try{
        const students = JSON.parse(data);

        students.array.forEach(student => {
            student += 5;
        });
    }
})