const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// --- MIDDLEWARE ---
// crucial: Allows us to read JSON data sent in req.body
app.use(express.json());
app.use(cors());

// --- DATABASE CONNECTION ---
mongoose.connect('mongodb://localhost:27017/myFirstApiDB')
    .then(() => console.log("Database Connected"))
    .catch(err => console.log("DB error:", err))

// --- MODEL (Quick definition for this file) ---
const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, required: true},
    email: {type: String, required: true, unique: true}
}));

// --- Routes ---

// 1. GET request (Read)
// Visit http://localhost:3000/ in your browser
app.get('/', (req, res) => {
    res.send("Welcome to your first API");
});

// 2. POST request (Create)
// Browser cannot do easily. You need postman/thunder Client.

app.post('/api/users', async(req, res) => {
    try {
        console.log("Data received: ", req.body); // check your console!
        
        // create user in MongoDB
        const newUser = await User.create(req.body);

        // send back the success response (201 == created)
        res.status(201).json({
            message: "User created successfully",
            user: newUser
        });
    } catch(error) {
        // Send back error response (500 = Server Error)
        res.status(500).json({
            message: "Error creating User",
            error: error.message
        });
    }
});

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`server running on http://localhost:3000`);
})