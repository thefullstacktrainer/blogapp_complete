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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
