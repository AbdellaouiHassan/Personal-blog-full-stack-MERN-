import React, { useEffect, useState } from 'react';
import PostList from '../components/PostList';
import axios from 'axios';
import { Link } from 'react-router';

const Home = () => {
 const [posts, setPosts] = useState([]);

  // Dummy data for now (replace with API data later)
    const fetchPosts = async() => {
        const res = await axios.get('http://localhost:3000/api/posts');
        setPosts(res.data);
        console.log(res.data)
    }

  useEffect(() => {
    fetchPosts()
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">All Blog Posts</h1>

      <div className="row mb-4">
        <div className="col-md-6 offset-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search posts..."
          />
        </div>
      </div>
      <div className="row">
      {posts.map((post) => (
        <div className="col-md-6 mb-4" key={post._id}>
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{post.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                by {post.author?.name || 'Unknown'} •{' '}
                {new Date(post.createdAt).toDateString()}
              </h6>
              <p className="card-text flex-grow-1">
                {post.content.slice(0, 100)}...
              </p>
              <Link to={`/posts/${post._id}`} className="btn btn-primary mt-auto">
                Read More
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Home;