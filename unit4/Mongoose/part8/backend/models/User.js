const mongoose = require('mongoose');
const bcrypt = require('bcryptjs') // Import bcrypt

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        }, 
        Password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        }
    }
);

// --- PASSWORD HASHING MIDDLEWARE ---
// Run this function BEFORE saving the user to database
userSchema.pre('save', async function(next) {
    // 'this' refers to the user document
    const user = this;

    // only hash the password if it has been modified (or is new)
    if(!user.isModified('password')) return next();

    try {
        // Generate a "salt" (random data to make the hash unique)
        const salt = await bcrypt.genSalt(10);
        // Hash the password with the salt
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch(error) {
        next(error);
    }
});

// --- HELPER METHOD: COMPARE PASSWORD ---
// we add a method to the user document to check the passowords easily
userSchema.methods.comparePassword = async function(candidatePassword) {
    // Returns true if match, false if not 
    return await bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model('User', userSchema);