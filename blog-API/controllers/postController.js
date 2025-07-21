const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const Post = require('../models/post');
const fs = require('fs');
const path = require('path');

const { protect } = require('../middlewares/authMiddleware');

router.post(
    '/add-post', 
    protect,
    upload.single('image'),
    async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : null;
    
    const post = new Post({
      title,
      content,
      image,
      author: req.user.id 
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create post' , err});
  }
});

router.get('/posts', async(req, res) =>{
    try {
       const posts = await Post.find().populate('author', 'name');
       res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch posts', error});
    }
});

router.get('/my-posts', protect, async(req, res) => {
    try {
        const posts = await Post.find({author: req.user.id}).populate('author', 'name');
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json("failed to fetch posts")
    }
});

router.get('/search-posts', async(req, res) =>{
    const { searchQuery } = req.query

    try {
       const posts = await Post.find({
         title: { $regex: searchQuery.trim(), $options: 'i' }
         }).populate('author', 'name');
       res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch posts', error});
    }
});

router.get('/posts/:id', async(req, res) => {
    const { id } = req.params;
    
    try {
        const post = await Post.findById(id).populate('author', 'name');
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch posts'});
    }
});

router.put('/update-post/:id', protect, upload.single('image'), async(req, res) => {
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : null;
    const { id } = req.params;

    try {
         const oldPost = await Post.findById(id);
        if (!oldPost) return res.status(404).json({ message: 'Post not found' });

        let updatedImage = oldPost.image;
        if (req.file) {
        if (oldPost.image) {
            const oldImagePath = path.join(__dirname, '../uploads', oldPost.image);
            fs.access(oldImagePath, fs.constants.F_OK, (err) => {
            if (!err) {
                fs.unlink(oldImagePath, (err) => {
                if (err) console.error('Failed to delete old image:', err);
                });
            }
            });

        }
        updatedImage = req.file.filename;
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id, 
            {title, content, image:updatedImage, author: req.user.id},
            {new: true, runValidators: true}
        )
        res.status(200).json({message: 'post updated:', updatedPost});
    } catch (error) {
        res.status(500).json({ message: 'Failed to update post'});
        console.log(error)
    }
});

router.delete('/delete-post/:id', protect, async(req, res) => {
    const { id } = req.params 
    try {
        const post = await Post.findById(id);

        if (!post) return res.status(404).json({ message: 'Post not found' });

        if (post.image) {
        const imagePath = path.join(__dirname, '../uploads', post.image);
        fs.unlink(imagePath, (err) => {
            if (err) console.error('Failed to delete image:', err);
        });
        }
        const deletedPost = await Post.findByIdAndDelete(id);
        res.status(200).json({message: 'post deleted:', deletedPost});
    } catch (error) {
         res.status(500).json({ message: 'Failed to delete post'});
    }
})

module.exports = router;
