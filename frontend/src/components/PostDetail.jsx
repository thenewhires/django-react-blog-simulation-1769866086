import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:8000/api';

function PostDetail({ posts, onUpdatePost }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      // Find the post in the provided posts array FIRST.
      const foundPost = posts.find(p => p.id === parseInt(id));
      if (foundPost) {
        setPost(foundPost);
        setUpdatedTitle(foundPost.title);
        setUpdatedContent(foundPost.content);

        // Also, load comments (new requirement)
        const response = await axios.get(`${BACKEND_URL}/posts/${id}/comments/`);
        setComments(response.data);

      } else {
        // If not found in the provided posts array, then fetch from backend
        try {
            const response = await axios.get(`${BACKEND_URL}/posts/${id}/`);
            setPost(response.data);
            setUpdatedTitle(response.title);
            setUpdatedContent(response.content);

             // Also, load comments (new requirement)
            const commentResponse = await axios.get(`${BACKEND_URL}/posts/${id}/comments/`);
            setComments(commentResponse.data);
        } catch (error) {
          console.error('Error fetching post:', error);
          navigate('/'); // Redirect to home if post not found
        }
      }
    };

    fetchPost();
  }, [id, navigate, posts]);

  const handleUpdate = async () => {
    await onUpdatePost(id, { title: updatedTitle, content: updatedContent });
    setEditMode(false);
    setPost({ ...post, title: updatedTitle, content: updatedContent }); // Local state update
  };

    const createComment = async (text) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/posts/${id}/comments/`, { text });
      setComments([...comments, response.data]);
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };


  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      {editMode ? (
        <div>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <textarea
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{post.content}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
        </div>
      )}
      <h3>Comments:</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
      <CommentForm onCreateComment={createComment} />
    </div>
  );
}

function CommentForm({ onCreateComment }) {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateComment(commentText);
    setCommentText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button type="submit">Add Comment</button>
    </form>
  );
}

export default PostDetail;
