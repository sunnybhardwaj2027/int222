const User = require('../models/User');

// Logic to create a user
const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json({ message: "Success", user: newUser });
    } catch (err) {
        res.status(500).json({ message: "Error", error: err.message});
    }
};

// Logic to get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find(); // Mongoose method to find all 
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Export these functions so routes can use them
module.exports = { createUser, getUsers };