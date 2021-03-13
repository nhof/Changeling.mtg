const express = require('express');

const app = express();



app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader(
    'Access-Control-Allow-Header','Origin, X-Requested-With, Accept'
  );
  res.setHeader('Access-Control-Allow-Header',"GET, POST, PATCH, DELETE, OPTIONS")
  next();
});

app.use('/api/posts',(req, res, next)=>{
  const posts = [
    {
      id:'asdasd',
      title: 'First serverside',
      text: 'coming from server',
      date: new Date()
    },
    {
      id:'asdasd',
      title: '2nd serverside',
      text: 'coming from server!',
      date: new Date()
    }
  ]
  res.status(200).json({
    message: 'sucess',
    posts: posts
  });
});

module.exports = app;
