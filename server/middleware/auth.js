// server/middleware/auth.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  console.log("token is",token);
  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
    console.log("decoded value",decoded)
    req.user = decoded;
    next();
  } catch (ex) {
    console.log("error is",ex)
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = authenticate;
