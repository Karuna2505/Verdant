const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const Plants = require('../models/plants');
const authenticate = require('../middleware/auth');

const router = express.Router();

// Add item to cart (either plant or pot)
router.post('/add', authenticate, async (req, res) => {
  const { type, count, itemId } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    if (type === 'plant') {
      // Look up plant by itemId and add to cart
      const plant = await Plants.findById(itemId);
      if (!plant) {
        return res.status(404).json({ message: 'Plant not found' });
      }
      // Add plant to cart (example logic)
      user.cart.push({ plantId: itemId, quantity: count });

    } else if (type === 'pot') {
      // Look up pot by itemId and add to cart
      const pot = await Pot.findById(itemId);
      if (!pot) {
        return res.status(404).json({ message: 'Pot not found' });
      }
      // Add pot to cart (example logic)
      await Cart.addPotToCart(pot, count);
    } else {
      return res.status(400).json({ message: 'Invalid item type' });
    }
    // Add plant to cart if plantId is provided


    await user.save();
    res.status(200).json({ message: "Item added to cart", cart: user.cart });
  } catch (err) {
    console.error("Error adding item to cart", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Remove item from cart
// Remove item from cart (either plant or pot)
router.delete('/remove', authenticate, async (req, res) => {
  const { plantId, potId } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if plantId or potId is provided
    if (plantId) {
      user.cart = user.cart.filter(item => item.productId?.toString() !== plantId);
    }
    if (potId) {
      user.cart = user.cart.filter(item => item.potId?.toString() !== potId);
    }

    await user.save();

    res.status(200).json({ message: "Item removed from cart", cart: user.cart });
  } catch (err) {
    console.error("Error removing item from cart", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Get cart
// Get cart
router.get('/', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .lean()
      .populate({
        path: 'cart.plantId',
        select: 'name price image_url',
      })
      .populate({
        path: 'cart.potId',
        select: 'name price image_url',
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
