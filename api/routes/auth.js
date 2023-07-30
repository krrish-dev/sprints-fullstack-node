// routes/auth.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../utils/authorization');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', authenticateToken, userController.logoutUser); // Ensure authentication middleware is applied
router.post('/forgot-password', userController.forgotPassword); // New endpoint for password reset request
router.post('/reset-password', userController.resetPassword); // New endpoint for resetting the password

module.exports = router;
