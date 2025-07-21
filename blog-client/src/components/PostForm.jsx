import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const PostForm = () => {
  const [title, setTitle] = useState(' ');
  const [content, setContent] = useState(' ');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(' ');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    if(!title || !content) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:3000/api/add-post',
        formData, 
        {
          headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
         },
        } 
      );
      setTitle(' ');
      setContent(" ");
      navigate('/');

    console.log(res.data)
    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);
      setError("Error while creating the post")
    }
  }
  return (
    <>
    <h1 className=' m-5'>Add a post</h1>
    <form className='p-5' onSubmit={handleSubmit}>
        <div className="form-group mb-4">
            <label htmlFor="exampleFormControlInput1">Title</label>
            <input type="text" className="form-control" id="exampleFormControlInput1"
            value={title} onChange={(e) =>(setTitle(e.target.value))}/>
        </div>
        
        <div className="form-group mb-4">
            <label htmlFor="exampleFormControlTextarea1">Content</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
            value={content} onChange={(e) =>(setContent(e.target.value))}></textarea>
        </div>
        
        <div className="form-group">
            <label htmlFor="exampleFormControlFile1">Image</label><br/>
            <input type="file" onChange={e => setImage(e.target.files[0])} className="form-control-file" id="exampleFormControlFile1"/>
        </div>

        {error && (<div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>)}
        <button className='btn btn-primary' type='submit'>Add post</button>
    </form>
    </>
  )
}

export default PostForm