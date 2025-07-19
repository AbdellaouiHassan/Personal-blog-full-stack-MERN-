import axios from 'axios';
import React, { useState } from 'react'

const PostForm = () => {
  const [title, setTitle] = useState(' ');
  const [content, setContent] = useState(' ');
  const [error, setError] = useState(' ');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Token in localStorage:', localStorage.getItem('token'));
    if(!title || !content) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:3000/api/add-post',
        { title, content }, 
        {
          headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
         },
        } 
      );

    console.log(res.data)
    } catch (error) {
      console.log(error)
      setError("Error while creating the post")
    }
  }
  return (
    <>
    <h1 className=' m-5'>Add a post</h1>
    <form className='p-5' onSubmit={handleSubmit}>
        <div className="form-group mb-4">
            <label for="exampleFormControlInput1">Title</label>
            <input type="text" className="form-control" id="exampleFormControlInput1"
            value={title} onChange={(e) =>(setTitle(e.target.value))}/>
        </div>
        
        <div className="form-group mb-4">
            <label for="exampleFormControlTextarea1">Content</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
            value={content} onChange={(e) =>(setContent(e.target.value))}></textarea>
        </div>
        {error && (<div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>)}
        <button className='btn btn-primary' type='submit'>Add post</button>

        {/* <div className="form-group">
            <label for="exampleFormControlFile1">Example file input</label>
            <input type="file" className="form-control-file" id="exampleFormControlFile1"/>
        </div> */}
    </form>
    </>
  )
}

export default PostForm