import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CommentSection from './CommentSection';

const PostList = ({ posts }) => {
 const [post, setPost] = useState([]);
 const { id } = useParams();

 const fetchPost = async () =>{
  try {
    const res = await axios.get(`http://localhost:3000/api/posts/${id}`);
    setPost(res.data)
  } catch (error) {
    console.log(error)
  }
 }

 useEffect(()=>{
  fetchPost();
 }, [ id ])

  return (
    <div className="row p-5">
        <div className="col-md-6 mb-4" key={post._id}>
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{post.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                by {post.author?.name || 'Unknown'} •{' '}
                {new Date(post.createdAt).toDateString()}
              </h6>
              <p className="card-text flex-grow-1">
                {post.content}
              </p>
              {post.image && (
              <img
                src={`http://localhost:3000/uploads/${post.image}`}
                alt="Post"
                className="img-fluid rounded mb-4 shadow-sm"
              />
               )}
            </div>
          </div>
        </div>
        <CommentSection />
    </div>
  );
};

export default PostList;
