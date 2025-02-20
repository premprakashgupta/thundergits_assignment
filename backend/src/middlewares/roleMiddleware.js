const roleMiddleware = (roles) => {
    return (req, res, next) => {
      const user = req.user; // Assuming user is added to the request via authentication middleware
      if (!user || !roles.includes(user.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }
      next();
    };
  };
  
  module.exports = roleMiddleware;
  