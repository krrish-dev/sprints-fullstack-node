// services/userService.js
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cartModels = require('../models/cartModel');
const registerUser = async (name, email, password) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });
    let cartInfo = await cartModels.createCart(newUser._id);
    newUser.cartId = cartInfo._id;
    await newUser.save();
    return newUser;
    
  } catch (error) {
    throw error;
  }
};

const loginUser = async (email, password) => {
      const user = await User.findOne({ email }).catch(error => {
        throw "Error eccured while logging in";
      });
      if (!user) 
        throw new Error('User not found');
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) 
        throw new Error('Invalid credentials');
      return user;
  };
  

const logoutUser = async (userId) => {
    try {
      const user = await User.findByIdAndUpdate(userId/*, { token: null }*/);
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
