// utils/authentication.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Authentication token required' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};
const checkAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: 'Unauthorized' });
    }
  };
  
  const checkSuperAdmin = (req, res, next) => {
    if (req.user.isSuperAdmin) {
      next();
    } else {
      return res.status(403).json({ message: 'Unauthorized' });
    }
  };
  
  module.exports = {
    authenticateToken,
    checkAdmin,
    checkSuperAdmin,
};
