import React, { useState } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [postName, setPostName] = useState('');
  const [description, setDescription] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editPostName, setEditPostName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPost = { postName, description };
    setPosts([...posts, newPost]);
    setPostName('');
    setDescription('');
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditPostName(posts[index].postName);
    setEditDescription(posts[index].description);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const updatedPosts = [...posts];
    updatedPosts[editIndex] = { postName: editPostName, description: editDescription };
    setPosts(updatedPosts);
    setEditIndex(null);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditPostName('');
    setEditDescription('');
  };

  const handleDelete = (index) => {
    const updatedPosts = [...posts];
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  return (
    <div className="App">
      <h1>Create a New Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="postName">Post Name:</label>
          <input
            type="text"
            id="postName"
            value={postName}
            onChange={(e) => setPostName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div className="post-list">
        <h2>Posts</h2>
        <ul>
          {posts.map((post, index) => (
            <li key={index}>
              {editIndex === index ? (
                <form onSubmit={handleUpdate}>
                  <div className="form-group">
                    <label htmlFor="editPostName">Edit Post Name:</label>
                    <input
                      type="text"
                      id="editPostName"
                      value={editPostName}
                      onChange={(e) => setEditPostName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="editDescription">Edit Description:</label>
                    <textarea
                      id="editDescription"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit">Update</button>
                  <button type="button" onClick={handleCancelEdit}>Cancel</button>
                </form>
              ) : (
                <>
                  <h3>{post.postName}</h3>
                  <p>{post.description}</p>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
