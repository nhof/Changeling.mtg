const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect(
  "mongodb+srv://USER:4BdHMTNkB8z5aYc@cluster0.jfapj.mongodb.net/Changeling?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>{console.log('connected to MongoDB')})
  .catch(()=> console.log('connection failed :\'\('))
;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader(
    'Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',"GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
  next();
});

app.post("/api/posts",(req, res, next)=>{
  const post = new Post({
    title: req.body.title,
    text: req.body.text
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added!',
      postId: createdPost._id
    });
  });
});

app.get('/api/posts',(req, res, next)=>{
//Mongoose Docs for more!
  Post.find()
  .then(documents =>{
    res.status(200).json({
      message: 'fetch',
      posts: documents
    });
  });
});

app.get('/api/posts/:id',(req,res,next)=>{
  Post.findById(req.params.id).then(post =>{
    if(post){
      res.status(200).json(post)
    } else{
      res.status(404).json({message:'Post not found'})
    }
  })
})


app.delete('/api/posts/:id',(req,res, next)=>{
Post.deleteOne({
  _id: req.params.id
}).then(result => {
  console.log(result);
  res.status(200).json({message:'Post deleted'})
  });
});

app.put('/api/posts/:id',(req, res, next)=>{
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    text: req.body.text
  })
  Post.updateOne({_id: req.params.id}, post).then(result =>{
    res.status(200).json({message: "updated!"})
  })
})

module.exports = app;
