const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
app.use(express.json()); 
require('dotenv').config();

const User = require('./controllers/userController');
const Posts = require('./controllers/postController');
const Comments = require('./controllers/commentController');

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

mongoose.connect('mongodb://localhost:27017/BlogDb').then(()=>{
  console.log("connected to mongo DB");
}).catch( err =>{
  console.log("error connecting to mongo DB", err);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


app.use('/api/users', User);
app.use('/api/posts', Posts);
app.use('/api/comments', Comments);
