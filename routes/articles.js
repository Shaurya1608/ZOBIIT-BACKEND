const { Router } = require('express');
const Article = require('../models/Article');
const upload = require('../middleware/upload');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Not found' });
    res.json(article);
  } catch (err) {
    next(err);
  }
});

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const { title, content, excerpt, category, readTime } = req.body;
    const imageUrl = req.file ? req.file.path : null;
    const article = await Article.create({ title, content, excerpt, category, readTime, imageUrl });
    res.status(201).json(article);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', upload.single('image'), async (req, res, next) => {
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
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: 'Article deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
