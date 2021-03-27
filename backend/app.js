const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");

const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts')


const app = express();

mongoose.connect(
  "mongodb+srv://USER:USER@cluster0.jfapj.mongodb.net/Changeling?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>{console.log('connected to MongoDB :\)')})
  .catch(err => console.log(err + ' connection failed :\'\('))
;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));

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

app.use("/api/posts",postsRoutes);

module.exports = app;
