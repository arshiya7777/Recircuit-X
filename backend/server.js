const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Direct Verified Live MongoDB Atlas Connection String
const MONGO_URI = "mongodb+srv://arshiyashaik1720_db_user:Ibrahim1234@recircuitx.ie56mkw.mongodb.net/recircuit?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => console.log('Successfully connected to Live MongoDB Atlas!'))
  .catch(err => console.log('MongoDB connection error:', err.message));

// Schemas
const listingSchema = new mongoose.Schema({
  title: String,
  category: String,
  brand: String,
  condition: String,
  age: Number,
  actionType: String,
  estimatedValue: Number,
  imageUrl: String,
  status: { type: String, default: 'Sorted' },
  greenCoins: Number,
  ownerName: { type: String, default: 'Mirza Ibrahim' },
  createdAt: { type: Date, default: Date.now }
});

const Listing = mongoose.model('Listing', listingSchema);

// Routes
app.get('/api/listings', async (req, res) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/listings', async (req, res) => {
  try {
    const { title, category, brand, condition, age, actionType, estimatedValue, imageUrl, greenCoins } = req.body;
    const newListing = new Listing({
      title,
      category,
      brand,
      condition,
      age,
      actionType,
      estimatedValue,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
      greenCoins: greenCoins || 150
    });
    await newListing.save();
    res.status(201).json(newListing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.patch('/api/listings/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Listing.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`ReCircuit Backend running on port ${PORT}`);
});