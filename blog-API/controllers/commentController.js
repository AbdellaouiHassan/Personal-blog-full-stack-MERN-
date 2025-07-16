const express = require('express');
const router = express.Router();

const Comment = require('../models/comment');
const { protect } = require('../middlewares/authMiddleware');
const comment = require('../models/comment');

router.post('/', protect, async(req, res) => {
    try {
        const { text, postId } = req.body;

        const comment = new Comment({
            text,
            post : postId,
            author: req.user.id
    });

    await comment.save();
    res.status(201).json({message: 'comment created', comment});

    } catch (error) {
        console.log(error);
        res.status(400).json({message: 'Failed to create a comment'});
    }
});

router.get('/getcomments', protect, async(req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json({comments});
    } catch (error) {
        res.status(400).json("failed to fetch comments")
    }
});

router.get('/getcomment/:id', protect, async(req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findById(id);
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json("failed to fetch the comment")
    }
});

router.put('/updatecomment/:id', protect, async(req, res) => {
    const { id } = req.params;
    try {
        const updatedcomment = await Comment.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
        res.status(200).json({message: 'comment updated:', updatedcomment})
    } catch (error) {
        res.status(400).json("failed to update the comment")
    }
});

router.delete('/deletecomment/:id', protect, async(req, res) => {
    const { id } = req.params;
    try {
        const delettedcomment = await Comment.findByIdAndDelete(id);
        res.status(200).json({message: 'comment deletted:', delettedcomment})
    } catch (error) {
        res.status(400).json("failed to delete the comment")
    }
})

module.exports = router; 