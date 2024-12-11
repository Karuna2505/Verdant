const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: String,
  image_url: String,
  description: String,
  price: Number,
  category: String,
});

module.exports = mongoose.model('Plant', plantSchema);