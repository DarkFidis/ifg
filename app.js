const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const color = require('color');
const bodyParser = require('body-parser');
const Article = require('/models/Article');
const Country = require('/models/Country');

mongoose.connect('mongodb://localhost/ifg');

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/new_article', (req, res) => {
  res.render('forms/article');
});

app.listen(3000);
