const express = require('express');
const ejs = require('ejs');
const path = require('path');
const Post = require('./models/Post');
const mongoose = require('mongoose');

const app = express();

// Connect DB
mongoose.connect('mongodb://localhost/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//TEMPLATE ENGİNE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
  const post = await Post.find({});
  res.render('index', {
    post,
  });
});
app.get('/posts/:id', async (req, res) => {
  //res.render('about');
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post,
  });
});
app.get('/about', (req, res) => {
  /*res.sendFile(path.resolve(__dirname, 'views/index.ejs'));*/
  res.render('about');
});
app.get('/add', (req, res) => {
  /*res.sendFile(path.resolve(__dirname, 'views/index.ejs'));*/
  res.render('add');
});
app.post('/post', async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
});
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running port: ${port}`);
});
