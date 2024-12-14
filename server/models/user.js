const mongoose = require('mongoose');

// Cart Item Schema
const cartItemSchema = new mongoose.Schema({
  plantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plant' }, // Reference to Plant model
  potId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pot' }, // Reference to Pot model
  quantity: { type: Number, required: true, default: 1 }, // Default quantity is 1
});

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  cart: [cartItemSchema], // Array of cart items, each with a plantId or potId
});

const User = mongoose.model('User', userSchema);

module.exports = User;
