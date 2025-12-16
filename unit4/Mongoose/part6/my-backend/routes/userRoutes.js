const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// when a POST request hits '/', run the createUser function
router.post('/', userController.createUser);

// when a GET request hits '/', run the getUsers function
router.get('/', userController.getUsers);

module.exports = router;