const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticate = async(req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from Authorization header
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET); // Assuming JWT_SECRET is in your .env file
    const user=await User.findById(decoded.userId)
    req.user = user; // Assuming the JWT payload has the user's role
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
