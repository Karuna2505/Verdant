const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const user="";


// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json());


mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    });

    const plantSchema = new mongoose.Schema({
        name: String,
        image_url: String,
        description: String,
        price: Number,
        category: String
    });

const Plant = mongoose.model('Plant', plantSchema);

const potSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    image_url: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  });
  
  const Pot = mongoose.model('Pot', potSchema);

  const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('User', userSchema);
    
    app.get('/', async (req, res) => {
        try {
            const plants = await Plant.find();
            res.json(plants);
        } catch (err) {
            console.error('Error fetching plants', err);
            res.status(500).send('Internal Server Error');
        }
    });    

    app.get('/pots' ,async (req,res) => {
      try {
        const pots = await Pot.find();
        res.json(pots);
    } catch (err) {
        console.error('Error fetching plants', err);
        res.status(500).send('Internal Server Error');
    }
    })

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

const authenticate = (req, res, next) => {
  console.log("Authorization header:", req.headers.authorization); // Log the Authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from the header
  if (!token) return res.status(403).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // Attach user info to the request
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
      res.status(500).send('Internal Server Error');
  }
});

app.get('/api/me', authenticate, (req, res) => {
  console.log(req.user)
  const email  = req.user;
  res.json({ email });
});





app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
