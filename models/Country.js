const mongoose = require('mongoose');

const countrySchema = mongoose.Schema({
  nom: String,
  url: String,
  capitale: String,
  superficie: Number,
  population: Number,
  langue: String,
  pnb: Number,
  pnbhab: Number,
  idh: Number,
  articles: [{type: mongoose.Schema.Types.ObjectId, ref:"Article"}]
});

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
