const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
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
    
    app.get('/api/plants', async (req, res) => {
        try {
            const plants = await Plant.find();
            res.json(plants);
        } catch (err) {
            console.error('Error fetching plants', err);
            res.status(500).send('Internal Server Error');
        }
    });    


app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
