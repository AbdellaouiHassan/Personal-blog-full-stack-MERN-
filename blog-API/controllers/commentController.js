const express = require('express');
const router = express.Router();

const Comment = require('../models/comment');
const { protect } = require('../middlewares/authMiddleware');
const comment = require('../models/comment');

router.post('/add-comment', protect, async(req, res) => {
    try {
        const { text, postId } = req.body;

        const comment = new Comment({
            text,
            post : postId,
            author: req.user.id
    });

    (await comment.save()).populate('author', 'name');
    res.status(201).json({message: 'comment created', comment});

    } catch (error) {
        console.log(error);
        res.status(400).json({message: 'Failed to create a comment'});
    }
});

router.get('/comments', async(req, res) => {
    const { id } = req.query
    try {
        const comments = await Comment.find({ post: id }).populate('author', 'name');
        res.status(200).json({comments});
    } catch (error) {
        res.status(400).json("failed to fetch comments")
    }
});

router.get('/comments/:id',  async(req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findById(id).populate('author', 'name');
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json("failed to fetch the comment")
    }
});

router.put('/updatecomment/:id', protect, async(req, res) => {
    const { id } = req.params;
    try {
        const updatedcomment = await Comment.findByIdAndUpdate(id, req.body, {new: true, runValidators: true}).populate('author', 'name');
        res.status(200).json({message: 'comment updated:', updatedcomment})
    } catch (error) {
        res.status(400).json("failed to update the comment")
    }
});

router.delete('/deletecomment/:id', protect, async(req, res) => {
    const { id } = req.params;
    try {
        const delettedcomment = await Comment.findByIdAndDelete(id).populate('author', 'name');
        res.status(200).json({message: 'comment deletted:', delettedcomment})
    } catch (error) {
        res.status(400).json("failed to delete the comment")
    }
})

module.exports = router; 