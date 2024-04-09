const express = require('express');
const bodyParser = require('body-parser');
 be_render

const cors = require('cors')

require('dotenv').config(); // Load environment variables from .env file
const cors = require('cors');
 be_lesson14_add_postgres
const app = express();
const PORT = process.env.PORT || 4000;
const { Pool } = require('pg');

be_render
app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => res.send("Welcome to blogpost"));

const connection = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432, // Default PostgreSQL port
    ssl: {
        rejectUnauthorized: false, // Set to false if using self-signed certificates
        // You may need to provide other SSL options such as ca, cert, and key
        // Example:
        // ca: fs.readFileSync('path/to/ca-certificate.crt'),
        // cert: fs.readFileSync('path/to/client-certificate.crt'),
        // key: fs.readFileSync('path/to/client-certificate.key')
    },
});

connection.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch((err) => {
        console.error('Error connecting to PostgreSQL database', err);
    });
be_lesson14_add_postgres

connection.query(`
    CREATE TABLE IF NOT EXISTS posts (
        post_id SERIAL PRIMARY KEY,
        postName VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`, (err, res) => {
    if (err) {
        console.error('Error creating table:', err);
    } else {
        console.log('Table created successfully');
    }
});
app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => res.send("Welcome to blogpost"));

// Create a new post
app.post('/api/posts', (req, res) => {
    const { postName, description } = req.body;
 be_render
    const newPost = { post_id: Date.now(), postName, description };
    posts.push(newPost);
    res.status(201).json(newPost);

    const query = 'INSERT INTO posts (postname, description) VALUES ($1, $2) RETURNING *';
    const values = [postName, description];
    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error creating post:', err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        res.status(201).json(result.rows[0]);
    });
 be_lesson14_add_postgres
});

// Get all posts
app.get('/api/posts', (req, res) => {
    connection.query('SELECT * FROM posts', (err, results) => {
        if (err) {
            console.error('Error getting posts:', err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        res.json(results.rows);
    });
});

 be_render
// Get a single post by post_id
app.get('/api/posts/:post_id', (req, res) => {
    const postId = parseInt(req.params.post_id);
    const post = posts.find(post => post.post_id === postId);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);

// Get a single post by ID
app.get('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    connection.query('SELECT * FROM posts WHERE post_id = $1', [postId], (err, results) => {
        if (err) {
            console.error('Error getting post:', err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const post = results.rows[0];
        res.json(post);
    });
 be_lesson14_add_postgres
});

// Update a post by ID
app.put('/api/posts/:post_id', (req, res) => {
    const postId = parseInt(req.params.post_id);
    const { postName, description } = req.body;
 be_render
    const postIndex = posts.findIndex(post => post.post_id === postId);
    if (postIndex === -1) {
        return res.status(404).json({ message: 'Post not found' });
    }
    posts[postIndex] = { post_id: postId, postName, description };
    res.json(posts[postIndex]);
});

// Delete a post by ID
app.delete('/api/posts/:post_id', (req, res) => {
    const postId = parseInt(req.params.post_id);
    const postIndex = posts.findIndex(post => post.post_id === postId);
    if (postIndex === -1) {
        return res.status(404).json({ message: 'Post not found' });
    }
    posts.splice(postIndex, 1);
    res.json({ message: 'Post deleted successfully' });

    const query = 'UPDATE posts SET postname = $1, description = $2 WHERE post_id = $3 RETURNING *';
    const values = [postName, description, postId];
    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating post:', err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        res.json(result.rows[0]);
    });
});

// Delete a post by ID
app.delete('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    connection.query('DELETE FROM posts WHERE post_id = $1', [postId], (err, result) => {
        if (err) {
            console.error('Error deleting post:', err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        res.json({ post_id: postId, message: 'Post deleted successfully' });
    });
 be_lesson14_add_postgres
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});