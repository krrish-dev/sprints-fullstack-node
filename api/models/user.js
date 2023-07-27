// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String }, // For storing tokens (e.g., Google login token)
  gender: { type: String }, // 'male', 'female', 'other', etc.
  address1: { type: String },
  address2: { type: String },
  phonenum: { type: String },
  country: { type: String },
  state: { type: String },
  isAdmin: { type: Boolean, default: false }, // For admin rank
  isSuperAdmin: { type: Boolean, default: false }, // For super-admin rank
  // Add any other user-related fields here, e.g., userImage, cart, orders, etc.
  // ...
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);