const mongoose = require('mongoose');

const potSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image_url: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
});

module.exports = mongoose.model('Pot', potSchema);
