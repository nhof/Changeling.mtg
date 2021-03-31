const express = require("express");
const multer = require('multer');
const mongoose = require('mongoose')

const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type")
    if(isValid){
      error = null;
    }
    // path relative to server.js
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name+'-'+Date.now()+'.'+ext);
  }
});

router.post(
  "",
  checkAuth,
  multer({storage: storage}).single("image"),
  (req, res, next)=>{
    const url = req.protocol + '://' + req.get("host");
    const post = new Post({
      title: req.body.title,
      text: req.body.text,
      imagePath: url + "/images/" + req.file.filename,
      creator: req.userData.userId
    });
    post.save().then(createdPost => {
      res.status(201).json({
        message: 'Post added!',
        post: {
          ...createdPost,
          imagePath: createdPost.imagePath
        }
      });
     }).catch(error =>
      res.status(500).json({
        message: "creating a post failed!"
      }));
  }
);

router.get('',(req, res, next)=>{
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if(pageSize && currentPage){
    postQuery
    .skip(pageSize*(currentPage - 1))
    .limit(pageSize)
  }
  postQuery
  .then(documents =>{
    fetchedPosts = documents;
    return Post.countDocuments();
  }).then(count=>{
    res.status(200).json({
      message: 'fetch',
      posts: fetchedPosts,
      maxPosts: count
    })
  }).catch(error =>{
    res.status(500).json("Fetching posts failed")
  });
});

router.get('/:id',(req,res,next)=>{
  Post.findById(req.params.id).then(post =>{
    if(post){
      res.status(200).json(post)
    } else{
      res.status(404).json({message:'Post not found'})
    }
  }).catch(error =>{
    res.status(500).json("Fetching post failed")
  });
})


router.delete(
  '/:id',
  checkAuth,
  (req,res, next)=>{
    Post.deleteOne({
      _id: req.params.id,
      creator: req.userData.userId
    }).then(result => {
      if(result.n>0){
        res.status(200).json({message: "Deletion successful!"});
      } else {
        res.status(401).json({message: "Not authorized!"});
      }
  }).catch(error =>{
    res.status(500).json("Not authorized!")
  });;
});

router.put(
  '/:id',
  checkAuth,
  multer({storage: storage}).single("image"),
  (req, res, next)=>
  {
    let imagePath = req.body.imagePath;
    if(req.file){
      const url = req.protocol + '://' + req.get("host");
      imagePath = url + "/images/" + req.file.filename
    }
    const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    text: req.body.text,
    imagePath: imagePath,
    creator: req.userData.userId
  })
  Post.updateOne({_id: req.params.id, creator: req.userData.userId}, post).then(result =>{
    if(result.n>0){
      res.status(200).json({message: "Update successful!"});
    } else {
      console.log("Problems")
      res.status(401).json({message: "Not authorized!"});
    }
  }).catch(error=>{
    res.status(500).json({message:"Couldn't update post"})
  })
})

module.exports = router;
