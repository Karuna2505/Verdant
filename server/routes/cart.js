// routes/cart.js
const express = require('express');
const User = require('../models/user');
const authenticate = require('../middleware/auth');  // Import authentication middleware
const router = express.Router();

// Add item to cart
router.post('/add', authenticate, async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if item already exists in the cart
    const existingItem = user.cart.find(item => item.productId.toString() === productId);
    if (existingItem) {
      // If item exists, update the quantity
      existingItem.quantity += quantity;
    } else {
      // Otherwise, add a new item to the cart
      user.cart.push({ productId, quantity });
    }

    await user.save();
    res.status(200).json({ message: "Item added to cart", cart: user.cart });
  } catch (err) {
    console.error("Error adding item to cart", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Remove item from cart
router.delete('/remove', authenticate, async (req, res) => {
  const { productId } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Remove the item from the cart
    user.cart = user.cart.filter(item => item.productId.toString() !== productId);

    await user.save();
    res.status(200).json({ message: "Item removed from cart", cart: user.cart });
  } catch (err) {
    console.error("Error removing item from cart", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get the user's cart
router.get('/', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.productId');  // Populate product details
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ cart: user.cart });
  } catch (err) {
    console.error("Error fetching cart", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
