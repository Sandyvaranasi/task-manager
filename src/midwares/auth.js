const jwt = require('jsonwebtoken');

// Middleware to verify JWT and check user role
const authenticateAndAuthorize = (requiredRole) => {
  return (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decodedToken = jwt.verify(token, 'your-secret-key');
      req.userId = decodedToken.userId;
      req.userRole = decodedToken.role;
      if (req.userRole !== requiredRole) {
        return res.status(403).json({ error: 'Access denied' });
      }
      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
};

module.exports = authenticateAndAuthorize