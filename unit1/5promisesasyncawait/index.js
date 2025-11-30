// Promises and async/await

// we have seen how callback works and how it lead to callback hell, a messy, nested pyramid of code. promises and async/await are modern solution to this problem.

// part 1 : promises => a promise is a javascript object that represents eventual completion (or failure) of an asynchronous operation => it is a 'placeholder' for future value

// the fast food order analogy : 

// 1. callback : you order food, give cashier your phone number, now you are free to do other things but you are waiting to be interupted by their call this is -> fs.readFile('file.txt', (err) => {...})

// 2. promise : you order food cashier give you a receipt with order number this receipt is promise . it's an object you hold on to => 1. you are not gonna be interupted you can check receipt(promise) whenever you want. 2. the receipt status starts as 'pending'(you are waiting for your food), 2. when your order is ready status changes to 'Fullfilled' (you got your food), 3. if they are out of burgers status changes to 'rejected' (mean an error occured)

// how we use promise => a function that returns a promise allow us to chain action using .then() and .catch()

// 1 .then((result) => {...}) => this runs if promise is fullfilled. the 'result' is the data(your food).

// 2 .catch((err) => {...}) => this runs if promise is rejected. the 'error' is the reason.

/*

// example callback hell

const fs = require('fs');
fs.readFile('user.txt', (err1, userData) => {
    db.query(userData.id, (err2, postData) => {
        fs.writeFile('posts.txt', postData, (err3) => {~
            console.log('All done!');
        })
    })
})

*/

/* why call back hell is a problem 

This nesting creates a "pyramid" that drifts to the right, and it's considered "hell" for a few key reasons:

It's Hard to Read: The logical flow isn't top-to-bottom; it's an inward-drifting spiral. Following the sequence of events is mentally taxing.

It's Hard to Maintain: What if you need to add a fourth step? (e.g., after writing the file, you need to log it to another database). You'd have to add another level of nesting inside fs.writeFile, making the pyramid even deeper.

Error Handling is Repetitive: You have to handle err1, then err2, then err3. In a large application, you might have 10 levels. It's very easy to forget to handle one error, and it's difficult to manage all of them in one clean place.

The "hell" isn't that it doesn't work—it does work. The "hell" is for the developer who has to read, debug, and maintain this messy structure.

This is the exact problem that Promises and async/await were invented to solve. They let you write this same logic in a flat, top-to-bottom way, which is much, much cleaner.

*/

// here is  how it looks with promise. notes how it's a flat chain not a nested pyramid

const fs = require('fs').promises; // <-- uses .promises version!

const path = require('path');

const userFilePath = path.join(__dirname, 'user.json');
const processedPath = path.join(__dirname, 'processed_user.json');

console.log('starting promises chain ---');

// start the chain
fs.readFile(userFilePath, 'utf8')
    .then((fileData) => {
        // --- step1: file is read ---
        console.log('read user.json successfully ---');
        // 'fileData' is a string parse it into an object
        const userObject = JSON.parse(fileData);

        // let's modify the object
        userObject.status = 'processed';
        userObject.processedAt = new Date().toISOString();

        // return the modified object to *next* .then()

        return userObject;
    })
    .then((modifiedUser) => {
        // --- step 2: data is modified ---

        console.log('user data processed.');
        // 'modifiedUser' is the object we returned above
        // Now stringfy it so we can write it into a file

        const dataToWrite = JSON.stringify(modifiedUser, null, 2);

        return fs.writeFile(processedPath, dataToWrite);
    })
    .then(() => {
        // --- step 3: file is written ---

        console.log('wrote user_processed.json succesfully...');

        console.log("All done!");
    })
    .catch((err) => {
        // this ONE block will catch any kind of error
        // -- Reading the file (eg - file not found)
        // -- parsing the JSON (eg - invalid JSON)
        // -- writing the file (eg - no permission)

        console.log('ERROR  in promise chain', err);
    });

// this is much cleaner but we can do even better

// part: async/await -> async/await is "syntactic sugar" on top of Promises. It lets you write asynchronous code that looks and reads like synchronous, blocking code, but it does not block the main thread. -> it's the preferred, modern way to handle asynchronous tasks.

// the keywords : 

// 1. async : You "decorate" a function with async to tell JavaScript it will contain asynchronous operations. An async function always returns a Promise.

// 2. await : You can only use this keyword inside an async function. You place it in front of any function that returns a Promise. It tells JavaScript to "pause" the execution of this function only until the Promise settles (is fulfilled or rejected).

// Example: The Final, Cleanest Version Let's convert our promise chain to async/await.

// 1. we define an 'async' function

const processedPath2 = path.join(__dirname, 'processed_user2.json');

async function processUser() {
    
    // 2. we put all our logic in try block 
    try {
        console.log('starting async/await process...');

        // --- step1 : read the file ---
        // code pauses here until the file is read
        console.log('1. reading user.json...');
        const fileData = await fs.readFile(userFilePath, 'utf8');

        console.log('2. processing data...');
        const userObject = JSON.parse(fileData);
        userObject.status = 'processed_with_asynce_await';
        userObject.processedAt = new Date().toISOString();

        // --- step3 = writie the new file ---
        console.log('writing processed_user2.json...');
        const dataToWrite = JSON.stringify(userObject, null, 2);
        await fs.writeFile(processedPath2, dataToWrite);

        console.log('All done!');

    } catch(err){
        // ONE 'catch' block handles all the errors
        // (file not found, bad JSON, write permission error, etc...)
        console.log('ERROR in async function: ', err);
    }
}

processUser();


// async/wait vs .then()

/*

If you compare this code to the previous .then() example, you'll see they do the exact same thing.

The .then() chain is a functional style: "do this, then do this, then do this."

The async/await version is an imperative style: "First, do this. Next, do this. Finally, do this."

Most developers find the async/await version much more natural and easier to read because it looks just like simple, synchronous code.

*/
