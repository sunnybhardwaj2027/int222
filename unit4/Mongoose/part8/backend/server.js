const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes'); // Import

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connect
mongoose.connect('mongodb://localhost:27017/myFinalApiDB')
    .then(() => console.log("DB connected"))
    .catch(err => console.log(err));

// useRoutes
// this says: "Any URL starting with /api/users, go look at userRoutes"
app.use('/api/auth', authRoutes); // New Auth Routes
app.use('/api/users', userRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));