const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateCreateUser, handleValidationErrors } = require('../middleware/userValidator');

// POST /api/auth/register
// we reuse our validator here because registering is basically creating a user.
router.post('/register', validateCreateUser, handleValidationErrors, authController.register);

// POST /api/auth/login
router.post('login', authController.login);

module.exports = router;