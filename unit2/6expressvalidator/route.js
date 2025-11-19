const express = require('express');
const router = express.Router();

// 1. import the tools we need from the package
// 'body' is used to define rules for the request body
// 'validationResults' is used to check if there were errors

const {body, validationResult} = require('express-validator');

// HomePage route
router.get('/', (req, res) => {
    res.send('<h1>Welcome to the homepage</h1>');
});

// --- validated post route ---
// we pass an ARRAY of validation rules as the second argument
router.post('/login', [
    // rule 1: 'email' field must be a valid email
    body('email').isEmail().withMessage('Must be a valid email address'),
    // rule 2: 'password' field must be at least 5 chars long
    body('password').isLength({ min : 5}).withMessage('password must be atleast 5 chars long'),
], (req, res) => {
    // --- inside the route handler ---

    // 1. check for the errors
    const errors = validationResult(req);

    // 2. if errors is not empty, send a 400 (bad request) response
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()});
    }

    // 3. if we reach here that means email is valid 
    const {email} = req.body;
    res.send(`Login successfull! Welcome user with email: ${email}`);
});

module.exports = router;