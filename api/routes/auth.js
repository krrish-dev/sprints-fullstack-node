// routes/auth.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../utils/authentication');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', authenticateToken, userController.logoutUser); // Ensure authentication middleware is applied

module.exports = router;
