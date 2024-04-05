const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors module

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware to allow all origins

app.get("/", (req, res) => res.send("Welcome to blogpost"));

let posts = [];

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'blog_user',
    password: 'password123',
    database: 'blog_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

// Create a new post
app.post('/api/posts', (req, res) => {
    const { postName, description } = req.body;
    const sql = 'INSERT INTO posts (postName, description) VALUES (?, ?)';
    connection.query(sql, [postName, description], (err, result) => {
        if (err) {
            console.error('Error creating post:', err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        res.status(201).json({ post_id: result.insertId, postName, description });
    });
});

// Get all posts
app.get('/api/posts', (req, res) => {
    const sql = 'SELECT * FROM posts';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error getting posts:', err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

// Get a single post by ID
app.get('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const sql = 'SELECT * FROM posts WHERE post_id = ?';
    connection.query(sql, [postId], (err, results) => {
        if (err) {
            console.error('Error getting post:', err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const post = results[0];
        res.json(post);
    });
});

// Update a post by ID
app.put('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const { postName, description } = req.body;
    const sql = 'UPDATE posts SET postName = ?, description = ? WHERE post_id = ?';
    connection.query(sql, [postName, description, postId], (err, result) => {
        if (err) {
            console.error('Error updating post:', err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        res.json({ post_id: postId, postName, description });
    });
});

// Delete a post by ID
app.delete('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const sql = 'DELETE FROM posts WHERE post_id = ?';
    connection.query(sql, [postId], (err, result) => {
        if (err) {
            console.error('Error deleting post:', err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Post deleted successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
