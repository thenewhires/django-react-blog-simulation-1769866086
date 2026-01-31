import React from 'react';
import { Link } from 'react-router-dom';

function PostList({ posts, onDeletePost }) {
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <Link to={`/posts/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>
          <p>{post.content.substring(0, 100)}...</p>
          <button onClick={() => onDeletePost(post.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default PostList;
