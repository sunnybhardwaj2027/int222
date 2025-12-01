// import the Mongoclient class from the library
const { MongoClient } = require('mongodb');

// 2. Define the connection URL
// this is the default address where MongoDB runs on your computer.
const url = 'mongodb://localhost:27017';

// 3. create a new client
const client = new MongoClient(url);

// 4. define the database name we want to use
const dbName = "college";

async function main() {
    try{
        // --- STEP A: CONNECT ---
        console.log('Connecting to server...');
        await client.connect();
        console.log('Connected successfully to MongoDB server!');

        // --- STEP B: SELECT DATABASE AND COLLECTION ---
        const db = client.db(dbName);
        const collection = db.collection('students');

        // --- STEP C: CREATE(INSERT) ---
        console.log('\n1. Inserting a new Student...');
        const insertResult = await collection.insertOne({
            name : "Rohan",
            age : 24,
            course : "MBA",
            city : "Mumbai"
        });

        console.log('Inserted Document: ', insertResult);

        // --- STEP D: READ(FIND) ---
        console.log('\n2. Finding the student...');
        // we use .toArray() because .find() returns a 'Cursor' (a pointer), not the data itself
        const foundDocs = await collection.find({ name : 'Rohan'}).toArray();
        console.log('Found: ', foundDocs);

        // --- STEP E: UPDATE ---
        console.log('\n3. Updating Student Age...');
        const updateResult = await collection.updateOne(
            {name : "Rohan"},
            {$set : {age : 25}}
        );
        console.log('Updated count: ', updateResult.modifiedCount);

        // STEP F: DELETE ---
        console.log('\n4. Deleting the student...');
        const deleteResult = await collection.deleteOne({name : "Rohan"});
        console.log("Deleted Count: ", deleteResult.deletedCount);

    } catch(err) {
        // This block runs if the DB is down or connection fails.
        console.log("An error occured:", err);
    } finally {
        // --- STEP G: CLOSE CONNECTION ---
        // always close the connection when you are done!
        await client.close();
        console.log('\nConnection Closed');
    }
}

// run the main function
main();

/*

ouput =>


Connecting to server...
Connected successfully to MongoDB server!

1. Inserting a new Student...
Inserted Document:  {
  acknowledged: true,
  insertedId: new ObjectId('692de8e2a9f7f660f1e6e7b8')
}

2. Finding the student...
Found:  [
  {
    _id: new ObjectId('692de8e2a9f7f660f1e6e7b8'),
    name: 'Rohan',
    age: 24,
    course: 'MBA',
    city: 'Mumbai'
  }
]

3. Updating Student Age...
Updated count:  1

4. Deleting the student...
Deleted Count:  1

Connection Closed

*/
