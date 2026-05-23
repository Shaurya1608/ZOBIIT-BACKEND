require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const app = express();
const PORT = process.env.PORT || 5000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ─── Connect to MongoDB ──────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ─── Mongoose Models ─────────────────────────────────────────────────────────

const articleSchema = new mongoose.Schema({
  title:     { type: String, required: true },
  content:   { type: String, required: true },
  excerpt:   { type: String, default: '' },
  category:  { type: String, default: 'General' },
  readTime:  { type: String, default: '3 min read' },
  imageUrl:  { type: String, default: null },
}, { timestamps: true });

const propertySchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  price:       { type: Number, required: true },
  location:    { type: String, required: true },
  beds:        { type: Number, default: 1 },
  baths:       { type: Number, default: 1 },
  area:        { type: String, default: '' },
  tag:         { type: String, default: 'Luxury' },
  category:    { type: String, default: 'Residential' },
  imageUrl:    { type: String, default: null },
}, { timestamps: true });

const Article  = mongoose.model('Article',  articleSchema);
const Property = mongoose.model('Property', propertySchema);

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── Multer (Image Uploads) ───────────────────────────────────────────────────
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'zobiit_assets',
    allowedFormats: ['jpg', 'png', 'jpeg', 'webp', 'svg', 'gif'],
  },
});
const upload = multer({ storage });

// ─── ARTICLES CRUD ────────────────────────────────────────────────────────────

// GET all
app.get('/api/articles', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one
app.get('/api/articles/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE
app.post('/api/articles', upload.single('image'), async (req, res) => {
  try {
    const { title, content, excerpt, category, readTime } = req.body;
    const imageUrl = req.file ? req.file.path : null;
    const article = await Article.create({ title, content, excerpt, category, readTime, imageUrl });
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
app.put('/api/articles/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, content, excerpt, category, readTime, existingImageUrl } = req.body;
    const imageUrl = req.file ? req.file.path : existingImageUrl || null;
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { title, content, excerpt, category, readTime, imageUrl },
      { new: true }
    );
    if (!article) return res.status(404).json({ error: 'Not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
app.delete('/api/articles/:id', async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: 'Article deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── PROPERTIES CRUD ──────────────────────────────────────────────────────────

// GET all
app.get('/api/properties', async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one
app.get('/api/properties/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: 'Not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE
app.post('/api/properties', upload.single('image'), async (req, res) => {
  try {
    const { title, description, price, location, beds, baths, area, tag, category } = req.body;
    const imageUrl = req.file ? req.file.path : null;
    const property = await Property.create({ title, description, price, location, beds, baths, area, tag, category, imageUrl });
    res.status(201).json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
app.put('/api/properties/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, description, price, location, beds, baths, area, tag, category, existingImageUrl } = req.body;
    const imageUrl = req.file ? req.file.path : existingImageUrl || null;
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { title, description, price, location, beds, baths, area, tag, category, imageUrl },
      { new: true }
    );
    if (!property) return res.status(404).json({ error: 'Not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
app.delete('/api/properties/:id', async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── INQUIRIES (Contact/Property Interest) ─────────────────────────────────

const inquirySchema = new mongoose.Schema({
  name:        { type: String, required: true },
  email:       { type: String, required: true },
  phone:       { type: String, required: true },
  message:     { type: String, default: '' },
  inquiryType: { type: String, default: '' },
  budget:      { type: String, default: '' },
  propertyId:  { type: String, default: null },
  propertyTitle: { type: String, default: null },
}, { timestamps: true });

const Inquiry = mongoose.model('Inquiry', inquirySchema);

app.post('/api/inquiries', async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);
    res.status(201).json({ message: 'Inquiry received', inquiry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
});
