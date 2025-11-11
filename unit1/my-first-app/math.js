const add = (a, b) => {
    return a+b;
};


const subtract = (a, b) => {
    return a-b;
};

const multiply = (a, b) => {
    return a*b;
};

// use exports *only* the parts we want other files to see

module.exports ={
    add, 
    subtract
};

// here we exported only add and subtract not multiply