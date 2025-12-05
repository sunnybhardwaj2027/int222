const mongoose = require('mongoose');

// define the schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],  // Custom error message
        trim: true,  // '   John     ' => 'John'
        minLength: 3,
        maxLength: 20,
    }, 
    email: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate emails in DB
        lowercase: true,  // User23@gmail.com => user23@gmail.com
        // Regex to validate email format
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    role: {
        type: String,
        // ENUM: The value MUST be one of these strings.
        enum: ['user', 'admin', 'guide'],
        default: 'user'
    },
    age: {
        type: Number,
        // CUSTOM VALIDATOR
        validate: {
            validator: function(value){
                // Return true if valid, false if invalid
                return value % 2 == 0;
            },
            message: props => `${props.value} is not an even Number! (We only accept even ages for weird reason)`
        }
    },
    tags: {
        type: [String], // Array of strings
        validate: {
            validator: function(v){
                return v && v.length > 0; // Array must not be empty
            },
            message: 'A user must have atleast one tag.'
        }
    }
}, {
    timestamps: true // Automatically adds 'createdAt' and 'updatedAt'
});

// method to check if user is a "Senior Admin"
userSchema.methods.isSeniorAdmin = function(){
    // 'this' refers to the spacific user document
    return this.role == 'admin' && this.age > 30;
}

// method to generate a formal greeting
userSchema.methods.sayHello = function() {
    return `Greetings, ${this.username}. Your role is ${this.role}.`;
}

// Stiatic method to find all admins
userSchema.statics.findAllAdmins = function(){
    // 'this' refers to the User Mode
    return this.find({role: 'admin'});
}

// create model
const User = mongoose.model('User', userSchema);
module.exports = User;
