const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Import the bouncer 
const { validateCreateUser, handleValidationErrors } = require('../middleware/userValidator');

// MODIFY THE POST ROUTE
// The request goes: Route -> Rules -> ErrorHandler -> Controller
router.post(
    '/',
    validateCreateUser, // Step 1: Run the checks 
    handleValidationErrors, // Step 2: check if checks passed
    userController.createUser // Step 3: Run logic (only if step 2 passed)
);

router.get('/', userController.getUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
