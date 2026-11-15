const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const trendController = require('../controllers/trendController');

// Validações para criação/edição de Trend
const trendValidationRules = [
  body('title').notEmpty().withMessage('O título é obrigatório'),
  body('category')
    .optional()
    .isIn(['moda', 'beleza', 'eletrônicos', 'casa', 'food', 'outros'])
    .withMessage('Categoria inválida'),
  body('viralityScore')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('viralityScore deve ser um número entre 0 e 100'),
  body('brazilImpactScore')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('brazilImpactScore deve ser um número entre 0 e 100'),
  body('platforms').optional().isArray().withMessage('platforms deve ser um array de strings'),
  body('tags').optional().isArray().withMessage('tags deve ser um array de strings'),
  body('sourceLinks').optional().isArray().withMessage('sourceLinks deve ser um array de URLs')
];

router.get('/', trendController.getTrends);
router.get('/:id', trendController.getTrendById);
router.post('/', trendValidationRules, trendController.createTrend);
router.put('/:id', trendValidationRules, trendController.updateTrend);
router.delete('/:id', trendController.deleteTrend);

module.exports = router;
