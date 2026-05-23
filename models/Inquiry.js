const mongoose = require('mongoose');

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

module.exports = mongoose.model('Inquiry', inquirySchema);
