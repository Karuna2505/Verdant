const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json()); // For parsing JSON request bodies

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
  category: String,
});

const Plant = mongoose.model('Plant', plantSchema);

// Pot Schema and Model
const potSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image_url: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
});

const Pot = mongoose.model('Pot', potSchema);

// User Schema and Model
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
  const { username, email, password } = req.body;

  try {
    // Check if email or username already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ message: "Email already registered" });

    const existingUsername = await User.findOne({ username });
    if (existingUsername) return res.status(400).json({ message: "Username already taken" });
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Save user to the database
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
   
    res.status(201).json({ message: "User registered successfully" });
    
  } catch (err) {
    console.log("Error registering user", err);
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
  const authHeader = req.headers.authorization; // Get the Authorization header
  const token = authHeader && authHeader.split(" ")[1]; // Extract the token

  if (!token) return res.status(403).json({ message: "Access token required" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify the token
    req.user = decoded; // Attach user info to the request object
    next(); // Pass control to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
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
  // Assuming 'req.user' contains the decoded JWT user info
  res.json({ email: req.user.email }); // Send the username as response
});

// Start server
app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
