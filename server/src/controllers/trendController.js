const Trend = require('../models/Trend');
const { validationResult } = require('express-validator');

// GET /api/trends - Retorna todas as trends com suporte a filtros por categoria e plataforma
exports.getTrends = async (req, res) => {
  try {
    const { category, platform } = req.query;
    const query = {};

    if (category) {
      query.category = category;
    }

    if (platform) {
      query.platforms = platform;
    }

    const trends = await Trend.find(query).populate('relatedProducts');
    res.json(trends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/trends/:id - Retorna uma trend específica por ID
exports.getTrendById = async (req, res) => {
  try {
    const trend = await Trend.findById(req.params.id).populate('relatedProducts');
    if (!trend) {
      return res.status(404).json({ message: 'Trend não encontrada' });
    }
    res.json(trend);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/trends - Cria uma nova trend
exports.createTrend = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const trend = new Trend(req.body);
    const savedTrend = await trend.save();
    res.status(201).json(savedTrend);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/trends/:id - Atualiza uma trend existente
exports.updateTrend = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedTrend = await Trend.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('relatedProducts');

    if (!updatedTrend) {
      return res.status(404).json({ message: 'Trend não encontrada' });
    }

    res.json(updatedTrend);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/trends/:id - Deleta uma trend por ID
exports.deleteTrend = async (req, res) => {
  try {
    const deletedTrend = await Trend.findByIdAndDelete(req.params.id);
    if (!deletedTrend) {
      return res.status(404).json({ message: 'Trend não encontrada' });
    }
    res.json({ message: 'Trend removida com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
