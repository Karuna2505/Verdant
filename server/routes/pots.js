const express = require('express');
const Pot = require('../models/pots');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const pots = await Pot.find();
    res.json(pots);
  } catch (err) {
    console.error('Error fetching pots', err);
    res.status(500).json({ message: 'Failed to fetch pots' });
  }
});

module.exports = router;
