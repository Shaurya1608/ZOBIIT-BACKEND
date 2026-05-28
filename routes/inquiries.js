const { Router } = require('express');
const Inquiry = require('../models/Inquiry');

const router = Router();

// GET all inquiries (newest first)
router.get('/', async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    next(err);
  }
});

// POST a new inquiry
router.post('/', async (req, res, next) => {
  try {
    const inquiry = await Inquiry.create(req.body);
    res.status(201).json({ message: 'Inquiry received', inquiry });
  } catch (err) {
    next(err);
  }
});

// DELETE an inquiry by ID
router.delete('/:id', async (req, res, next) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Inquiry deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
