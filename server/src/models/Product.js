const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  averagePrice: Number,
  platforms: [String],
  imageUrl: String,
  opportunityScore: { type: Number, min: 0, max: 100 },
  chinaPrice: Number,
  scoreHistory: [Number],
  highScoreReason: String,
  relatedTrend: String,
  relatedTrends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trend' }],
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
