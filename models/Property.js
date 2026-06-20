const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  price:       { type: Number, required: true },
  priceUnit:   { type: String, enum: ['Lakh', 'Crore'], default: 'Crore' },
  priceMax:    { type: Number, default: null },
  priceMaxUnit:{ type: String, enum: ['Lakh', 'Crore'], default: 'Crore' },
  city:        { type: String, default: 'Ranchi' },
  location:    { type: String, required: true },
  beds:        { type: Number, default: 1 },
  baths:       { type: Number, default: 1 },
  area:        { type: String, default: '' },
  tag:         { type: String, default: 'Luxury' },
  category:    { type: String, default: 'Residential' },
  imageUrl:    { type: String, default: null },
  pricePerSqft:{ type: Number, default: null },
  totalSqft:   { type: Number, default: null },
  configurations: [{
    name:        { type: String, required: true },
    area:        { type: String, default: '' },
    price:       { type: Number, required: true },
    priceUnit:   { type: String, enum: ['Lakh', 'Crore'], default: 'Crore' },
    priceMax:    { type: Number, default: null },
    priceMaxUnit:{ type: String, enum: ['Lakh', 'Crore'], default: 'Crore' },
  }]
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
