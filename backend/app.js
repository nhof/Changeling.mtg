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
    'Access-Control-Allow-Methods',"GET, POST, PATCH, DELETE, OPTIONS"
    );
  next();
});

app.post("/api/posts",(req, res, next)=>{
  //const post = req.body
  const post = new Post({
    title: req.body.title,
    text: req.body.text
  });
  post.save();
  res.status(201).json({
    message: 'TaDah!'
  });
});

app.get('/api/posts',(req, res, next)=>{
  const posts = [
    {
      id:'asdasd',
      title: 'First serverside',
      text: 'coming from server'
    },
    {
      id:'asdasd',
      title: '2nd serverside',
      text: 'coming from server!'
    }
  ]
  res.status(200).json({
    message: 'sucess',
    posts: posts
  });
});

module.exports = app;
