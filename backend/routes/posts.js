const express = require("express");
const Post = require('../models/post');

const router = express.Router();

router.post("",(req, res, next)=>{
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

router.get('',(req, res, next)=>{
//Mongoose Docs for more!
  Post.find()
  .then(documents =>{
    res.status(200).json({
      message: 'fetch',
      posts: documents
    });
  });
});

router.get('/:id',(req,res,next)=>{
  Post.findById(req.params.id).then(post =>{
    if(post){
      res.status(200).json(post)
    } else{
      res.status(404).json({message:'Post not found'})
    }
  })
})


router.delete('/:id',(req,res, next)=>{
Post.deleteOne({
  _id: req.params.id
}).then(result => {
  console.log(result + ' deleted');
  res.status(200).json({message:'Post deleted'})
  });
});

router.put('/:id',(req, res, next)=>{
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    text: req.body.text
  })
  Post.updateOne({_id: req.params.id}, post).then(result =>{
    res.status(200).json({message: "updated!"})
  })
})

module.exports = router;
