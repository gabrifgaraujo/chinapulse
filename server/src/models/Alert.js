const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  userId: String,
  keyword: String,
  category: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);
