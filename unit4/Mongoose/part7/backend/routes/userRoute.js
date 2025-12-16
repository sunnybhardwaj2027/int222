const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// when a POST request hits '/', run the createUser function
router.post('/', userController.createUser);

// when a GET request hits '/', run the getUsers function
router.get('/', userController.getUsers);

// the ":id" acts like a variable.
// if you call /api/users/5f8a..., Express stores "5f8a..." this in req.params
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
module.exports = router;