// services/userService.js
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (name, email, password) => {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    return newUser;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (email, password) => {
    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
  
      // Validate the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }
  
      // Generate and store the JWT token in the user's document
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      user.token = token;
      await user.save();
  
      return user;
    } catch (error) {
      throw error;
    }
  };
  

const logoutUser = async (userId) => {
    try {
      const user = await User.findByIdAndUpdate(userId, { token: null });
      return user;
    } catch (error) {
      throw error;
    }
  };


  const savePasswordResetToken = async (email, token) => {
    try {
      // Find the user by email and update the password reset token and its expiration time
      await User.findOneAndUpdate({ email }, { passwordResetToken: token, passwordResetExpires: Date.now() + 900000 /* 15 minutes */ });
    } catch (error) {
      throw error;
    }
  };
  
  const resetUserPassword = async (email, password) => {
    try {
      // Find the user by email and update the password
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.findOneAndUpdate({ email }, { password: hashedPassword, passwordResetToken: null, passwordResetExpires: null });
    } catch (error) {
      throw error;
    }
  };
  
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  savePasswordResetToken,
  resetUserPassword,
};
