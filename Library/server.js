const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Replace <db_password> with your actual password
const mongoURI = 'mongodb+srv://adityanayak:Adi123@books.4s4bw4x.mongodb.net/?retryWrites=true&w=majority&appName=books';

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB schema and model
const librarySchema = new mongoose.Schema({
  subject: String,
  pyqs: [String],
  researchPapers: [String],
  books: [String],
});

const Library = mongoose.model('Library', librarySchema);

// Connect and insert default data if not present
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('✅ Connected to MongoDB');
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Get list of subjects
app.get('/subjects', async (req, res) => {
  try {
    const subjects = await Library.find({}, 'subject');
    res.json(subjects.map(doc => doc.subject));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subjects' });
  }
});

// Get resources for a subject
app.get('/resources/:subject', async (req, res) => {
  try {
    const { subject } = req.params;
    const doc = await Library.findOne({ subject });
    if (!doc) return res.status(404).json({ error: 'Subject not found' });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
