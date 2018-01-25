const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const color = require('color');
const bodyParser = require('body-parser');
const Article = require('./models/Article');
const Country = require('./models/Country');
const Source = require('./models/Source');

mongoose.connect('mongodb://localhost/geopolitique');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
}));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/pays/:pays', (req, res) => {
  Country.findOne({url: req.params.pays}).populate("articles").exec((err, country) => {
    console.log(country);
    res.render('pays', { country: country });
  });
});

app.get('/article', (req, res) => {
  res.render('read');
});

app.get('/new_article', (req, res) => {
  Country.find().then((countries, err) => {
    if(err) { console.log(err); }
    Source.find().then((sources, err) => {
      res.render('forms/article', {countries: countries, sources: sources});
    });
  });
});

app.get('/new_country', (req, res) => {
  res.render('forms/country');
});

app.get('/new_source', (req, res) => {
  res.render('forms/source');
});

app.post('/new_article', (req, res) => {
  let article = new Article({
    number: req.body.number,
    released: req.body.date,
    title: req.body.title,
    content: req.body.content,
    source: req.body.source,
    pays: req.body.country
  });
  article.save(() => {
    Country.findOne({_id: article.pays}).exec((err, country) => {
      country.articles.push(article);
    });
  }).then(() => {
    res.redirect('/');
  }, err => console.log(err));
});

app.post('/new_country', (req, res) => {
  let country = new Country({
    nom: req.body.nom,
    url: req.body.url,
    capitale: req.body.capitale,
    superficie: req.body.superficie,
    population: req.body.population,
    langue: req.body.langue,
    pnb: req.body.pnb,
    pnbhab: req.body.pnbhab,
    idh: req.body.idh
  });
  country.save((err) => {
    if(err) { throw err; }
    console.log('Pays créé');
    res.redirect('/');
  });
});

app.post('/new_source', (req, res) => {
  let source = new Source({
    nom: req.body.nom,
    city: req.body.city,
    url: req.body.url
  });
  source.save((err) => {
    if(err) { throw err; }
    console.log('Source ajoutée');
    res.redirect('/');
  })
});

app.listen(3000);
