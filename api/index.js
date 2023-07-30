// index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const { authenticateToken } = require('./utils/authorization');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

// Middleware
app.use(express.json());

// Connect to the database
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.error('Error connecting to the database:', err));

// Routes
app.use('/', authRoutes);
app.use(productRoutes);
app.use(cartRoutes);

// Example protected route
app.get('/admin', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
