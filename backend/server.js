const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => res.send("Welcome to blogpost"));

let posts = [];

// Create a new post
app.post('/api/posts', (req, res) => {
    const { postName, description } = req.body;
    const newPost = { post_id: Date.now(), postName, description };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// Get all posts
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// Get a single post by post_id
app.get('/api/posts/:post_id', (req, res) => {
    const postId = parseInt(req.params.post_id);
    const post = posts.find(post => post.post_id === postId);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
});

// Update a post by ID
app.put('/api/posts/:post_id', (req, res) => {
    const postId = parseInt(req.params.post_id);
    const { postName, description } = req.body;
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
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
