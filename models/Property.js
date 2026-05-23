const mongoose = require('mongoose');

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

module.exports = mongoose.model('Property', propertySchema);
