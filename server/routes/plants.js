const express = require('express');
const Plant = require('../models/plants');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (err) {
    console.error('Error fetching plants', err);
    res.status(500).json({ message: 'Failed to fetch plants' });
  }
});

module.exports = router;
