const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  number: Number,
  released: Date,
  title: String,
  content: String,
  source: {type: mongoose.Schema.Types.ObjectId, ref:"Source"},
  pays: {type: mongoose.Schema.Types.ObjectId, ref:"Country"}
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
