const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title:     { type: String, required: true },
  content:   { type: String, required: true },
  excerpt:   { type: String, default: '' },
  category:  { type: String, default: 'General' },
  readTime:  { type: String, default: '3 min read' },
  imageUrl:  { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
