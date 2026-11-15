const mongoose = require('mongoose');

const trendSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: {
    type: String,
    enum: ['moda', 'beleza', 'eletrônicos', 'casa', 'food', 'outros'],
    default: 'outros'
  },
  platforms: [String],
  viralityScore: { type: Number, min: 0, max: 100 },
  brazilImpactScore: { type: Number, min: 0, max: 100 },
  scoreHistory: [Number],
  relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  tags: [String],
  sourceLinks: [String]
}, { timestamps: true });

module.exports = mongoose.model('Trend', trendSchema);
