import React from 'react'

const PostForm = () => {
  return (
    <>
    <form>
        <div className="form-group">
            <label for="exampleFormControlInput1">Title</label>
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
        </div>
        
        <div className="form-group">
            <label for="exampleFormControlTextarea1">Content</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>

        <div className="form-group">
            <label for="exampleFormControlFile1">Example file input</label>
            <input type="file" className="form-control-file" id="exampleFormControlFile1"/>
        </div>
    </form>
    </>
  )
}

export default PostForm