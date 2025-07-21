import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';

const UpdatePost =() => {
    const [title, setTitle] = useState(' ');
    const [content, setContent] = useState(' ');
    const [image, setImage] = useState(null);
    const [error, setError] = useState(' ');
    const { id } = useParams()
    const navigate = useNavigate();

    const fetchPost = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/posts/${id}`);
            setTitle(res.data.title);
            setContent(res.data.content);
            setImage(res.data.image)
        } catch (error) {
            setError('Error while fetching the post:', error);
            console.log(error)
        }
    };

    const handleSubmit = async(e) =>{
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
        const res = await axios.put(
            `http://localhost:3000/api/update-post/${ id }`,
            formData,
            {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            } 
        );
        setTitle(' ');
        setContent(" ");
        navigate('/dashboard');

        console.log(res.data)
        } catch (error) {
        console.log(error.response?.status);
        console.log(error.response?.data);
        setError("Error while editing the post")
        }
    } 

    useEffect(() => {
        fetchPost();
    }, [])
  return (
    <>
    <h1 className=' m-5'>Edit post</h1>
    <form className='p-5' onSubmit={handleSubmit} >
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
        <button className='btn btn-primary' type='submit'>Edit post</button>

        
        
    </form>
    </>
  )
}

export default UpdatePost