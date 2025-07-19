const express = require('express');
const router = express.Router();

const Post = require('../models/post');
const { protect } = require('../middlewares/authMiddleware');

router.post('/add-post', protect, async (req, res) => {
  try {
    const { title, content } = req.body;
    
    const post = new Post({
      title,
      content,
      author: req.user.id 
    });

    await post.save().populate('author', 'name email');
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create post' , err});
  }
});

router.get('/posts', async(req, res) =>{
    try {
       const posts = await Post.find().populate('author', 'name email');
       res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch posts', error});
    }
});

router.get('/posts/:id', async(req, res) => {
    const { id } = req.params;
    
    try {
        const post = await Post.findById(id).populate('author', 'name email');
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch posts'});
    }
});

router.put('/updatepost/:id', protect, async(req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;

    try {
        const updatedPost = await Post.findByIdAndUpdate(
            id, 
            {title, content},
            {new: true, runValidators: true}
        )
        res.status(200).json({message: 'post updated:', updatedPost});
    } catch (error) {
        res.status(500).json({ message: 'Failed to update post'});
    }
});

router.delete('/deletepost/:id', protect, async(req, res) => {
    const { id } = req.params 
    try {
        const deletedPost = await Post.findByIdAndDelete(id);
        res.status(200).json({message: 'post deleted:', deletedPost});
    } catch (error) {
         res.status(500).json({ message: 'Failed to delete post'});
    }
})

module.exports = router;
