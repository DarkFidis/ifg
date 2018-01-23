const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const color = require('color');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/ifg');

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(3000);
