const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Replaced bodyParser with express.json()

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

// Plant Schema and Model
const plantSchema = new mongoose.Schema({
  name: String,
  image_url: String,
  description: String,
  price: Number,
  category: String
});

const Plant = mongoose.model('Plant', plantSchema);

// Pot Schema and Model
const potSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image_url: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true }
});

const Pot = mongoose.model('Pot', potSchema);

// User Schema and Model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Routes

// Get all plants
app.get('/', async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (err) {
    console.error('Error fetching plants', err);
    res.status(500).json({ message: 'Failed to fetch plants' });
  }
});

// Get all pots
app.get('/pots', async (req, res) => {
  try {
    const pots = await Pot.find();
    res.json(pots);
  } catch (err) {
    console.error('Error fetching pots', err);
    res.status(500).json({ message: 'Failed to fetch pots' });
  }
});

// Register a new user
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to the database
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login user
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    console.error("Error logging in user", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Middleware to authenticate JWT token
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from header
  if (!token) return res.status(403).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // Attach user info to request object
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Example: Protect the plants route
app.get('/secure-plants', authenticate, async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (err) {
    console.error('Error fetching plants', err);
    res.status(500).json({ message: 'Failed to fetch plants' });
  }
});

// Get user info
app.get('/api/me', authenticate, (req, res) => {
  // Send user email
  res.json({ email: req.user.email });
});

// Start server
app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
