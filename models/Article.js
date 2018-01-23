const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  number: String,
  released: Date,
  title: String,
  content: String,
  source: String,
  pays: {type: mongoose.Schema.Types.ObjectId, ref:"Country"}
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
