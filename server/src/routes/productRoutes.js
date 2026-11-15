const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const productController = require('../controllers/productController');

// Validações para criação/edição de Product
const productValidationRules = [
  body('name').notEmpty().withMessage('O nome do produto é obrigatório'),
  body('averagePrice')
    .optional()
    .isNumeric()
    .withMessage('O preço médio deve ser um número'),
  body('opportunityScore')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('opportunityScore deve ser um número entre 0 e 100'),
  body('platforms').optional().isArray().withMessage('platforms deve ser um array de strings')
];

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', productValidationRules, productController.createProduct);
router.put('/:id', productValidationRules, productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
