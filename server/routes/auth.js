const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
const authenticate = require('../middleware/auth'); 
// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ message: "Email already registered" });

    const existingUsername = await User.findOne({ username });
    if (existingUsername) return res.status(400).json({ message: "Username already taken" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log("Error registering user", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email: user.email, username: user.username }, process.env.SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error("Error logging in user", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Get logged-in user's info (authenticated)
router.get('/api/me', authenticate, async (req, res) => {
    try {
      // Send the logged-in user's information (email and username) from the decoded JWT
      res.json({ username: req.user.username, email: req.user.email });
    } catch (err) {
      console.error("Error fetching user data", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

module.exports = router;
