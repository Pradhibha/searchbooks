require('dotenv').config();
const express = require('express');
const next = require('next');
const axios = require('axios');
const db = require('./db');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const authRoutes = require('./auth');
const authenticate = require('./middleware/auth');

app.prepare().then(() => {
  const server = express();
  server.use(express.json());

  server.use('/api/auth', authRoutes);

  // Protect all routes starting with /api/books
  server.use('/api/books', authenticate);

  // GET endpoint for searching books
  server.get('/api/books', async (req, res) => {
    try {
      const { title, author, startDate, endDate, genre, sortBy, order = 'ASC', page = 1, pageSize = 10, isbn, availability } = req.query;
      let query = 'SELECT * FROM books WHERE 1=1';
      let queryParams = [];

      if (title) {
        query += ' AND title LIKE ?';
        queryParams.push(`%${title}%`);
      }
      if (author) {
        query += ' AND authors LIKE ?';
        queryParams.push(`%${author}%`);
      }
      if (startDate && endDate) {
        query += ' AND published_date BETWEEN ? AND ?';
        queryParams.push(startDate, endDate);
      }
      if (genre) {
        query += ' AND genre = ?';
        queryParams.push(genre);
      }
      if (isbn) {
        query += ' AND isbn = ?';
        queryParams.push(isbn);
      }
      if (availability !== undefined) {
        if (availability === 'true') {
          query += ' AND availability = 1';
        } else if (availability === 'false') {
          query += ' AND (availability = 1 OR availability = 0)';
        } else {
          throw new Error('Invalid availability value');
        }
      }
      if (sortBy) {
        query += ` ORDER BY ${sortBy} ${order}`;
      }

      const parsedPage = parseInt(page, 10);
      const parsedPageSize = parseInt(pageSize, 10);

      if (isNaN(parsedPage) || isNaN(parsedPageSize) || parsedPage < 1 || parsedPageSize < 1) {
        throw new Error('Invalid page or pageSize parameters');
      }

      query += ' LIMIT ? OFFSET ?';
      queryParams.push(parsedPageSize, (parsedPage - 1) * parsedPageSize);

      const [rows] = await db.query(query, queryParams);
      res.json({ items: rows });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message || 'Bad Request' });
    }
  });

  // POST endpoint for adding books
  server.post('/api/books', async (req, res) => {
    try {
      const { title, authors, description, published_date, genre, isbn, availability } = req.body;
      if (!title || !authors || !description || !published_date || !genre || !isbn || availability === undefined) {
        throw new Error('All book details are required');
      }
      const insertQuery = 'INSERT INTO books (title, authors, description, published_date, genre, isbn, availability) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const queryParams = [title, authors, description, published_date, genre, isbn, availability ? 1 : 0];
      const [result] = await db.query(insertQuery, queryParams);
      res.status(201).json({ id: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message || 'Bad Request' });
    }
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
}).catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
