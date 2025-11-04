const fs = require('fs');

fs.readFile('student.json', 'utf8', (err, data) => {
    if(err){
        console.error("Error readind file:", err);
        return;
    }
    let student = JSON.parse(data);
    
    student.city = "Mumbai";
    student.grade = "b+";
    student.address = "hoshiarpur";

    fs.writeFile('student.json', JSON.stringify(student, null, 2), (err) => {
        if(err){
            console.log("Error writing file:", err);
        } else {
            console.log("JSON file updated successfully");
        }
    })
})

