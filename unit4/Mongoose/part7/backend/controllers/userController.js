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

// UPDATE a user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params; // GET Id from the URL (e.g. /api/users/123)

        // { new : true } tells mongoose to return the Updated user, not the old one
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

        if(!updatedUser) {
            return res.status(404).json( {message: "User not found"} );
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

// DELETE a user
const deleteUser = async (req, res) => {
    try {
        const { id } = req. params;

        const deletedUser = await User.findByIdAndDelete(id);

        if(!deletedUser){
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted Successfully" });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}

// Export these functions so routes can use them
module.exports = { createUser, getUsers, updateUser, deleteUser };