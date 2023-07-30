// utils/authentication.js
const jwt = require('jsonwebtoken');
const constants = require('./constants');
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
  
 
const verifyAccess = (action)=> (req, res, next) =>{
  if (!verifyToken(req, res)) return;
  if (!checkAuthorization(req, res, action)) return;
  next();
}

function verifyToken(req, res, options = { isAccessToken: true }) {
  if(!req.headers.authorization){
    res.status(401).send({ success: false, message: "Unauthorized" });
    return false;
  }
  const token = req.headers.authorization.split(' ')[1];
  let { isAccessToken } = options;
  if (!token) {
    res.status(401).send({ success: false, message: "Unauthorized" });
    return false;
  }
  let result = false;
  let key = isAccessToken ? process.env.JWT_SECRET : process.env.REFRESH_TOKEN;
  jwt.verify(
    token,
    key,
    (err, userInfo) => {
      if (err) {
        res.status(401).send({ success: false, message: isAccessToken ? "Invalid Token" : "Invalid token" });
        return false;
      }
      req.user = userInfo;
      req.token = token;
      result = true;
    });
  return result;
}

function checkAuthorization(req, res, action){
  if(action == constants.Actions.all) return true;
  let userRoleActions = constants.AllowedActions[req.user.userRole];
  if(!userRoleActions.includes(action)){
    res.status(401).send({ success: false, message:"Your are not authorized to access this resource." });
    return false;
  }
  return true;
}

module.exports = {
  authenticateToken,
  checkAdmin,
  checkSuperAdmin,
  verifyAccess
};