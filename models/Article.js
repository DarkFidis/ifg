const mongoose = require('mongoose');
require('mongoose-moment')(mongoose);
const moment = require('../middlewares/datefr');

const articleSchema = mongoose.Schema({
  number: Number,
  released: 'Moment',
  title: String,
  content: String,
  source: {type: mongoose.Schema.Types.ObjectId, ref:"Source"},
  pays: {type: mongoose.Schema.Types.ObjectId, ref:"Country"}
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
