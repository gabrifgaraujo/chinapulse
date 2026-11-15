const Product = require('../models/Product');
const { validationResult } = require('express-validator');

// GET /api/products - Retorna todos os produtos com suporte a filtros por categoria e plataforma
exports.getProducts = async (req, res) => {
  try {
    const { category, platform } = req.query;
    const query = {};

    if (category) {
      query.category = category;
    }

    if (platform) {
      query.platforms = platform;
    }

    const products = await Product.find(query).populate('relatedTrends');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/products/:id - Retorna um produto específico por ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('relatedTrends');
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/products - Cria um novo produto
exports.createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/products/:id - Atualiza um produto existente
exports.updateProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('relatedTrends');

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/products/:id - Deleta um produto por ID
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json({ message: 'Produto removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
