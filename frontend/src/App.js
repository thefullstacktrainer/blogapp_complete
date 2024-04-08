import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [postName, setPostName] = useState('');
  const [description, setDescription] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editPostName, setEditPostName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://blogapp-complete-be-lucky.onrender.com/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make a POST request to create a new post
      const response = await axios.post('https://blogapp-complete-be-lucky.onrender.com/api/posts', {
        postName,
        description
      });

      // Log the response data (you can handle it as needed)
      console.log('New post created:', response.data);
      setPosts([...posts, response.data]);
      // Clear input fields after successful creation
      setPostName('');
      setDescription('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleEdit = (postId) => {
    const postToEdit = posts.find(post => post.post_id === postId);
    console.log(postToEdit);
    if (postToEdit) {
      setEditIndex(postId);
      setEditPostName(postToEdit.postname);
      setEditDescription(postToEdit.description);
    }
  };


  const handleUpdate = async () => {
    try {
      await axios.put(`https://blogapp-complete-be-lucky.onrender.com/api/posts/${editIndex}`, {
        postName: editPostName,
        description: editDescription
      });
      // Update the local state with the edited post details
      const updatedPosts = [...posts];
      updatedPosts[editIndex] = {
        ...updatedPosts[editIndex],
        postName: editPostName,
        description: editDescription
      };
      setPosts(updatedPosts);
      // Reset edit state
      setEditIndex(null);
      setEditPostName('');
      setEditDescription('');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };


  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditPostName('');
    setEditDescription('');
  };


  const handleDelete = async (postId) => {
    try {
      await axios.delete(`https://blogapp-complete-be-lucky.onrender.com/api/posts/${postId}`);
      // Filter out the deleted post from the state
      setPosts(posts.filter(post => post.post_id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
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
            <li key={post.post_id}>
              {editIndex === post.post_id ? (
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
                  <h3>{post.postname}</h3>
                  <p>{post.description}</p>
                  <button onClick={() => handleEdit(post.post_id)}>Edit</button>
                  <button onClick={() => handleDelete(post.post_id)}>Delete</button>
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
