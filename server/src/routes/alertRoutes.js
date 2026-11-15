const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const alertController = require('../controllers/alertController');

// Validações para Alerts
const alertValidationRules = [
  body('keyword').notEmpty().withMessage('A palavra-chave (keyword) é obrigatória'),
  body('userId').optional().isString(),
  body('category').optional().isString(),
  body('isActive').optional().isBoolean().withMessage('isActive deve ser booleano')
];

router.get('/', alertController.getAlerts);
router.get('/:id', alertController.getAlertById);
router.post('/', alertValidationRules, alertController.createAlert);
router.put('/:id', alertValidationRules, alertController.updateAlert);
router.delete('/:id', alertController.deleteAlert);

module.exports = router;
