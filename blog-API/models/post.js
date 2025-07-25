const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
    },
  content:{
    type: String,
    required: true,
    },
  image: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('post', postSchema);
