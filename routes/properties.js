const { Router } = require('express');
const Property = require('../models/Property');
const upload = require('../middleware/upload');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: 'Not found' });
    res.json(property);
  } catch (err) {
    next(err);
  }
});

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const { title, description, price, location, beds, baths, area, tag, category } = req.body;
    const imageUrl = req.file ? req.file.path : null;
    const property = await Property.create({ title, description, price, location, beds, baths, area, tag, category, imageUrl });
    res.status(201).json(property);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', upload.single('image'), async (req, res, next) => {
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
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
