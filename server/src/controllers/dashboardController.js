const Trend = require('../models/Trend');
const Product = require('../models/Product');
const Alert = require('../models/Alert');

// GET /api/dashboard - Retorna dados agregados para o dashboard
exports.getDashboardData = async (req, res) => {
  try {
    const [
      totalTrends,
      totalProducts,
      activeAlertsCount,
      topTrends,
      topProducts,
      categoryDistribution
    ] = await Promise.all([
      Trend.countDocuments(),
      Product.countDocuments(),
      Alert.countDocuments({ isActive: true }),
      Trend.find().sort({ viralityScore: -1 }).limit(5).populate('relatedProducts'),
      Product.find().sort({ opportunityScore: -1 }).limit(5).populate('relatedTrends'),
      Trend.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $project: { category: '$_id', count: 1, _id: 0 } }
      ])
    ]);

    res.json({
      summaryCards: {
        totalTrends,
        totalProducts,
        activeAlerts: activeAlertsCount
      },
      topTrends,
      topProducts,
      categoryDistribution
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
