// 1. import mongoose
const mongoose = require('mongoose');

// 2. connection url (same as before, but with the DB name included)
const url = 'mongodb://localhost:27017/college';

async function main(){
    try {
        // --- STEP A: CONNECT ---
        console.log('Connecting to MongoDB...');
        // Mongoose handles connection buffering(it waits until connected)
        await mongoose.connect(url);
        console.log('Connected Succesfully');

        // --- STEP B: DEFINE SCHEMA (THE RULES) ---
        // this is where Mongoose shines. we define strict types.
        const studentSchema = new mongoose.Schema({
            name : {
                type : String, 
                required : true, // must have a name
                cast: false    
            }, 
            age : { type : Number, min : 18}, // must be 18+
            course : String, // short syntax
            isEnrolled: { type : Boolean, default : true} // default value
        });

        // --- STEP C: CREATE MODEL (THE TOOL) ---
        // 'Student' is the name of the model.
        // Mongoose automatically looks for the collection named 'students' (lowercase + plural)

        const Student = mongoose.model('Student', studentSchema);

        // --- STEP D: CRUD OPERATIONS ---

        //1. CREATE(SAVE)
        console.log('\n1. Creating a new Student...');
        // we create a new instance of the model
        const newStudent = new Student ({
            name : "Sanya",
            age : 20,
            course : "B.Tech"
        });
        // we call .save() to write it to the database
        const saveDoc = await newStudent.save();
        console.log('Saved:', saveDoc);

        //2. FIND(FIND)
        console.log('\n2. Finding the Student...');
        // Mongoose gives us the simpler methods. No need for .toArray()
        const foundStudent = await Student.findOne({name:"Sanya"});
        console.log('Found:', foundStudent);

        //3. UPDATE
        console.log('\n3. Updating Course...');
        // Model.UpdateOne(filter, update)
        const updateResult = await Student.updateOne(
            {name : "Sanya"},
            {$set : {course : "M.Tech"}}
        );

        console.log('Modified Count:', updateResult.modifiedCount);

        //4. DELETE
        console.log('\n4. Deleting the Student...');
        const deleteResult = await Student.deleteOne( { name : "Sanya"});
        console.log('Deleted Count:', deleteResult.deletedCount);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        //--- STEP E: CLOSE CONNECTION---
        await mongoose.connection.close();
        console.log('\nConnection closed');
    }
}

main();

/*

output --> 

Connecting to MongoDB...
Connected Succesfully

1. Creating a new Student...
Saved: {
  name: 'Sanya',
  age: 20,
  course: 'B.Tech',
  isEnrolled: true,
  _id: new ObjectId('6930d2ad91874b516338b475'),
  __v: 0
}

2. Finding the Student...
Found: {
  _id: new ObjectId('6930d2ad91874b516338b475'),
  name: 'Sanya',
  age: 20,
  course: 'B.Tech',
  isEnrolled: true,
  __v: 0
}

3. Updating Course...
Modified Count: 1

4. Deleting the Student...
Deleted Count: 1

Connection closed

*/