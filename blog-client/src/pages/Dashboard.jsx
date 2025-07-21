import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Await, Link } from 'react-router';

const Dashboard = () => {
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState('Guest')

    const fetchPosts = async() => {
        try {
            const res = await axios.get(
            'http://localhost:3000/api/my-posts',
            {
                headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            });
            setUserPosts(res.data);
            setUser(res.data[0].author.name)
        } catch (error) {
            console.log(error.data)
        }
    }

    useEffect(()=> {
        fetchPosts()
    }, [])

    const handleDelete = async(id) =>{
        const confirmeDelete = window.confirm("are you sure you want to delete this post?");
        if(!confirmeDelete){
            return;
        }

        try {
            const res = await axios.delete(`http://localhost:3000/api/delete-post-comments/${id}`,
                {
                headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                }});  
            
        } catch (error) {
            console.log(error)
        }

        try {
            const res = await axios.delete(`http://localhost:3000/api/delete-post/${id}`,
                {
                headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                }});
        fetchPosts();
        } catch (error) {
            console.log(error)
        }

        
    }
  return (
    <>
    <div className="container mt-4">
        <h2 className="mb-3">My Dashboard</h2>
        <p className="mb-4">Welcome, {user}</p>

        <div className="mb-4">
        <Link to="/add-post" className="btn btn-primary">
            Add New Post
        </Link>
        </div>

        {userPosts.length > 0 ? (
        <div className="list-group">
            {userPosts.map((post) => (
            <div
                key={post._id}
                className="list-group-item d-flex justify-content-between align-items-start"
            >
                <div>
                <h5 className="mb-1">{post.title}</h5>
                <p className="card-text flex-grow-1">
                    {post.content.slice(0, 100)}...
                </p>
                <small className="text-muted">
                    {new Date(post.createdAt).toDateString()}
                </small>
                </div>
                <div>
                <Link to={`/posts/${post._id}`} className="btn btn-sm btn-outline-primary me-2">
                    View
                </Link>
                <Link to={`/edit-post/${post._id}`} className="btn btn-sm btn-outline-secondary me-2">
                    Edit
                </Link>
                
                <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(post._id)}
                >
                    Delete
                </button>
                </div>
            </div>
            ))}
        </div>
        ) : (
        <p className="text-muted">You haven’t written any posts yet.</p>
        )}
    </div>
    </>

  )
}

export default Dashboard