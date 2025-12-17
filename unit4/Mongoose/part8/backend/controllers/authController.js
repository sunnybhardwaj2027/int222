const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Secret Key (In a real app, put this in .env file!)
const JWT_SECRET = "my_super_secret_key_123";

// 1. REGISTER logic
const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if(existinguser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create User (password hashing happens automatically in the Model)
        const user = await User.create({ username, email, password, role });

        req.status(201).json({ message: "User Registered Successfull" });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. LOGIN Logic
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // A. Find the User
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: "Invalid Credentials"}); // Generic errors for security
        }

        // B. Check the password (using our helper method)
        const isMatch = await user.comparePassword(password);
        if(!isMatch) {
            return res.status(400).json({ message: "Invalid credentials"});
        }

        // C. Generate Token (The 'ID Badge')
        // payload: What info is inside the token? (usually the ID and Role)
        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        res.status(200).json({
            message: "Login Successfull", 
            token: token,
            user: { username: user.username, role: user.role }
        });

    } catch(err) {
        res.status(500).json( {error: error.message} );
    }
};

module.exports = { register, login };
