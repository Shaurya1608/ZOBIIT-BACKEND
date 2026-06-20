const { Router } = require('express');
const Lead = require('../models/Lead');

const router = Router();

// GET all leads (newest first)
router.get('/', async (req, res, next) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    next(err);
  }
});

// POST a new lead
router.post('/', async (req, res, next) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json({ message: 'Lead captured', lead });
  } catch (err) {
    next(err);
  }
});

// DELETE a lead
router.delete('/:id', async (req, res, next) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lead deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
