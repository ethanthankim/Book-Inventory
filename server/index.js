const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password1',
    database: 'book_inventory',
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

app.get('/allBooks', (req, res) => {
    db.query('SELECT * FROM Books', (err, results) => {
        if (err) {
            console.error('Error with test query:', err);
            return res.status(500).send('Database connection error');
        }
        res.json(results);
    });
});
app.get('/viewBooks', (req, res) => {
    console.log(req.query);
    const {title, author, genre, order, asc} = req.query;
    let query = `
        SELECT * FROM Books
        WHERE title LIKE "%${title}%"
        AND author LIKE "%${author}%"
    `;
    if (genre) {
        query += `AND genre = "${genre}"`
    };
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

app.get('/genres', (req, res) => {
    db.query('SELECT DISTINCT Genre FROM Books ORDER BY Genre ASC', (err, results) => {
        if (err) {
            console.error('Error with test query:', err);
            return res.status(500).send('Database connection error');
        }
        res.json(results);
    });
});

app.post('/books', (req, res) => {
    const { title, author, genre, publication_date, isbn } = req.body;
    const query = 'INSERT INTO Books (title, author, genre, publication_date, isbn) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [title, author, genre, publication_date, isbn], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('Book added successfully');
    });
});


const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
