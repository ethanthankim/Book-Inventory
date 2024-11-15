require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

// Test route to verify database connection
app.get('/test-db', (req, res) => {
    db.query('SELECT * FROM Books', (err, results) => {
        if (err) {
            console.error('Error with test query:', err);
            return res.status(500).send('Database connection error');
        }
        res.json(results);
    });
});

// Request for viewing books in database with filtering
app.get('/viewBooks', (req, res) => {
    // console.log("Request query", req.query);
    const {title, author, genre, start, end, isbn, order, asc} = req.query;
    let query = `
        SELECT * FROM Books
        WHERE title LIKE "%${title}%"
        AND author LIKE "%${author}%"
        AND isbn LIKE "%${isbn}%"
    `;
    if (genre) {
        query += `AND genre = "${genre}"`
    };
    if (start) {
        query += `AND publication_date >= "${start}"`
    }
    if (end) {
        query += `AND publication_date <= "${end}"`
    }
    if (order) {
        query += `ORDER BY ${order} ${asc ==='true' ? 'ASC' : 'DESC'}`
    }

    console.log(query)
    db.query(
        query, (err, results) => {
        if (err) {
            console.error('Error with test query:', err);
            return res.status(500).send('Database connection error');
        }
        res.json(results);
    });
});

// Get the list of genres currently in database to be used as the select menu options
app.get('/genres', (req, res) => {
    db.query('SELECT DISTINCT Genre FROM Books ORDER BY Genre ASC', (err, results) => {
        if (err) {
            console.error('Error with test query:', err);
            return res.status(500).send('Database connection error');
        }
        res.json(results);
    });
});

// Request for adding books to the database
app.post('/addBook', (req, res) => {
    const { title, author, genre, publication_date, isbn } = req.body;
    const query = 'INSERT INTO Books (title, author, genre, publication_date, isbn) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [title, author, genre, publication_date, isbn], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).send('A Book with this ISBN already exists.')
            }
            return res.status(500).send(err);
        }
        res.status(201).send('Book added successfully');
    });
});


const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
