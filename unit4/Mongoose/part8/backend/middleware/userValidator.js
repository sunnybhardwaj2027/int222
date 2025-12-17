const { body, validationResult } = require('express-validator');

// 1. define the rules

const validateCreateUser = [
    // Check Username: Must not be empty
    body('username')
        .trim() // Remove 'whitespaces' "    John     " => "John"
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 chars long'),

    // Check email: Must be a valid email format
    body('email')
        .isEmail().withMessage('Must be a valid email address')
        .normalizeEmail(), // Sanitize email (conver to lowecase)

    // Check password (if you had one):
    // body('password').isLength({ min: 6 }).withMessage('Password too Short')

];

// 2. middleware function that checks the results.
const handleValidationErrors = (req, res, next) => {
    // check if the rules above found any erros
    const errors = validationResult(req);

    // if there ARE erros, stop the requrest here. Don't call next().
    if(!errors.isEmpty()){
        return res.status(400).json({
            message: "Validation Failed",
            errors: errors.array()
        });
    }

    // if no Errors, let the request pass to the controller
    next();
};

module.exports = { validateCreateUser, handleValidationErrors };