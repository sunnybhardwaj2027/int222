// core modules => this downloaded with npm no need to download if we want to use it just write 'require' and use it

const fs = require('fs');

fs.writeFileSync('hello.txt', 'Hello from Node.js!');
const data = fs.readFileSync('hello.txt', 'utf-8');

console.log(data);

// local module => modules that you create, they have their own file
// you export functionality from one file using module.exports and in other file you import that functionality using require. ex => ./my-module

const myMath = require('./math.js');

const sum = myMath.add(5, 3);
console.log('5 + 3 = ', sum);

const subtract = myMath.subtract(5, 3);
console.log('5 - 3 = ', subtract);

/*

const mult = myMath.multiply(5, 3);
console.log('5 * 3 = ', mult);

= > this will give an error because math.js didn't exported multiply function so it's unknow for this file

*/

// third-party module => modules created by other developers that you download from the npm register these are your dependencies install it with command = npm install <package-name>

// chalk => it's a very popular and simple package it add color to your console ouput
// note => it uses modern js so require will not work for this if we want to use 'require' then not install version 5 insall version 4 of chalk
// for installing version 4 => npm install chalk@4

const chalk = require('chalk');
console.log(chalk.blue('Hello in blue'));
console.log(chalk.red('this is an error in red'));
console.log(chalk.green.bold('this is a success message'));

// EventEmitter => EventEmitter is a built-in class(found in the event core module) that forms the very foundation of node js event driven model

// it's a like a ring bell in restoraunt like, waiter takes an order after that waiter gives the information to kitchen takes another order. when the food is ready kitchen will rang a bell the waiter will respond so here ring bell is EventEmitter

// import the 'events' from core module


const EventEmitter = require('events');

// create a new instance ('our bell')
const myEmitter = new EventEmitter();

// 3. Set up the listener (the waiter listening)
// We use .on() to subscribe to an event called 'orderReady'

myEmitter.on('orderReady', (tableNumber, dish) => {
    console.log(`EVENT HEARD: serving ${dish} to table ${tableNumber}`);
});

// 4. Publish (or emit) the event
// This is the kitchen ringing the bell
// We can pass arguments (data) along with the event

console.log('Kitchen is cooking...');
myEmitter.emit('orderReady', 5, 'biryani');

// emit another event
console.log('another order is up...');
myEmitter.emit('orderReady', 4, 'burger & fries');

// callback => A callback is a function that you pass as an argument to another function, with the expectation that it will be "called back" later.

// synchronous(blocking)
try{
    console.log('Reading file synchronously...');
    const data2 = fs.readFileSync('hello.txt', 'utf-8'); // first this file will be read after that only rest of the code will run
    console.log('SYNC READ: ', data2);
} catch(err){
    console.log('SYNC ERROR: ', err);
}

console.log('This line MUST wait for the sync read to finish.');
console.log('--------------------');

// asynchronous(non-blocking) => this is good Node.js way

console.log('Reading asychronously ...');
fs.readFile('hello.txt', 'utf-8', (err, data) => {
    // this is a callback function this will run after file will be read

    //1. always check for the error first
    if(err){
        console.error('ASYNC ERROR: ', err);
        return; // stop execution if there is an error
    }

    //2. if no error data is valid
    console.log('ASYNC READ: ', data);
});

console.log('This line runs IMMEDIATELY, before the async read is finished.');

