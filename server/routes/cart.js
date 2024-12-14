const express = require('express');
const User = require('../models/user');
const Product = require('../models/plants');
const authenticate = require('../middleware/auth');

const router = express.Router();

// Add item to cart
router.post('/add', authenticate, async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Check if the item already exists in the cart
    const existingItem = user.cart.find(item => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
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

    user.cart = user.cart.filter(item => item.productId.toString() !== productId);
    await user.save();

    res.status(200).json({ message: "Item removed from cart", cart: user.cart });
  } catch (err) {
    console.error("Error removing item from cart", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get cart
router.get('/', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'cart.productId',
      select: 'name price image_url description', // Only return these fields
    });

    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ cart: user.cart });
  } catch (err) {
    console.error("Error fetching cart", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Clear cart
router.delete('/clear', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = [];
    await user.save();

    res.status(200).json({ message: "Cart cleared", cart: user.cart });
  } catch (err) {
    console.error("Error clearing cart", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
