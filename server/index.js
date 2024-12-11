const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Import routes
const plantRoutes = require('./routes/plants');
const potRoutes = require('./routes/pots');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');

// Import middleware
const authenticate = require('./middleware/auth');

const allowedOrigins = ['https://verdant-frontend.onrender.com', 'http://localhost:3000'];

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

// Use routes
app.use('/api/plants', plantRoutes);
app.use('/api/pots', potRoutes);
app.use('/', authRoutes);
app.use('/api/cart', cartRoutes);

// Secure route example
app.get('/api/secure-plants', authenticate, async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (err) {
    console.error('Error fetching plants', err);
    res.status(500).json({ message: 'Failed to fetch plants' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
