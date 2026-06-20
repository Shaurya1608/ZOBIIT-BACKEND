const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  phone:       { type: String, required: true },
  city:        { type: String, default: '' },
  heardFrom:   { type: String, required: true }, // Where they heard about the website
  purpose:     { type: String, default: '' },     // What they're looking for
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
