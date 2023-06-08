const jwt = require('jsonwebtoken');

// Middleware to verify JWT 
const authenticateAndAuthorize = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, 'your-secret-key');
      req.userId = decodedToken.userId;
      req.userRole = decodedToken.role;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid token '+ error.message });
    }
};

module.exports = authenticateAndAuthorize