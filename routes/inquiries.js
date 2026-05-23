const { Router } = require('express');
const Inquiry = require('../models/Inquiry');

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const inquiry = await Inquiry.create(req.body);
    res.status(201).json({ message: 'Inquiry received', inquiry });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
