const mongoose = require('mongoose');

sourceSchema = mongoose.Schema({
  nom: String,
  city: String,
  url: String
});

const Source = mongoose.model("Source", sourceSchema);

module.exports = Source;
