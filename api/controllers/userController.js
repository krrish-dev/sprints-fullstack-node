// controllers/userController.js
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const { z } = require('zod');

const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = registerSchema.parse(req.body);

    await userService.registerUser(name, email, password);

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = loginUserSchema.parse(req.body);

    const user = await userService.loginUser(email, password);

    // Create and send JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login successful', token, user: { name: user.name } });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
    try {
      await userService.logoutUser(req.user.userId);
      return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      return res.status(500).json({ message: 'Error logging out' });
    }
  };

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
