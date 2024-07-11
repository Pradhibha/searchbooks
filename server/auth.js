// server/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./db');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// User Registration
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const insertQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
  await db.query(insertQuery, [username, hashedPassword]);
  
  res.status(201).json({ message: 'User registered successfully' });
});

// User Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
  
    try {
      const [user] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

      console.log("the user",user)
      console.log("the user password",user[0].password)
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      // Check if user.password exists and is a string
      if (!user[0].password ) {
        return res.status(500).json({ error: 'Invalid password data in database' });
      }

      if ( typeof user[0].password !== 'string') {
        return res.status(500).json({ error: 'Invalid password datatype in database' });
      }
  
      // Compare passwords using bcrypt
      const isPasswordValid = await bcrypt.compare(password, user[0].password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      // Generate JWT token and send response
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
module.exports = router;
