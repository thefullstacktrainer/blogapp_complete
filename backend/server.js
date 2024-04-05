const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Welcome to blogpost"));

let posts = [];

// Create a new post
app.post('/api/posts', (req, res) => {
    const { postName, description } = req.body;
    const newPost = { id: Date.now(), postName, description };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// Get all posts
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// Get a single post by ID
app.get('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(post => post.id === postId);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
