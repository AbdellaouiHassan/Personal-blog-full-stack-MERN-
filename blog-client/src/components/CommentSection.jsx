import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const CommentSection = () => {
    const [comment, setComment] = useState(' ');
    const [comments, setComments] = useState([ ]);
    const { id } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!comment){
            return;
        };
        
        try {
            console.log(comment, id)
            const res = await axios.post('http://localhost:3000/api/add-comment', 
            {
                text: comment,
                postId: id
            },
            {
                headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        )
        console.log(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    const fetchComments = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/comments',
                {params:{ id },
            });
            setComments(res.data.comments);
        } catch (error) {
            console.log(error);
        }  
    }

    useEffect(() =>{
        fetchComments()
    }, [comments])


  return (
    <div className='p-5'>
    <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
        <label htmlFor="commentInput" className="form-label">
            Add a new comment
        </label>
        <input
            id="commentInput"
            type="text"
            className="form-control"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment..."
        />
        </div>
        <button type="submit" className="btn btn-primary">
        Add comment
        </button>
    </form>

    <div>
        {comments.length > 0 ? (
        <div className="list-group">
            {comments.map((comment) => (
            <div
                key={comment._id}
                className="list-group-item list-group-item-action flex-column align-items-start mb-4"
            >
                <p className="mb-1">{comment.text}</p>
                <small className="text-muted">
                by {comment.author?.name || 'Unknown'} •{' '}
                {new Date(comment.createdAt).toDateString()}
                </small>
            </div>
            ))}
        </div>
        ) : (
        <div className="text-muted">No comments yet</div>
        )}
    </div>
    </div>

  )
}

export default CommentSection