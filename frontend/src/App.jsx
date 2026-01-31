import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import Header from './components/Header';

const BACKEND_URL = 'http://localhost:8000/api';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const createPost = async (newPost) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/posts`, newPost);
      setPosts([...posts, response.data]);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const updatePost = async (id, updatedPost) => {
    try {
      await axios.put(`${BACKEND_URL}/posts/${id}/`, updatedPost);
      setPosts(posts.map(post => (post.id === id ? updatedPost : post)));
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/posts/${id}`);
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <Header onCreatePost={createPost} />
      <Routes>
        <Route path="/" element={<PostList posts={posts} onDeletePost={deletePost} />} />
        <Route path="/posts/:id" element={<PostDetail posts={posts} onUpdatePost={updatePost} />} />
      </Routes>
    </div>
  );
}

export default App;
