const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  id:Number,
  name: String,
  image_url: String,
  description: String,
  price: Number,
  category: String,
});

module.exports = mongoose.model('Plant', plantSchema);