const Alert = require('../models/Alert');
const { validationResult } = require('express-validator');

// GET /api/alerts - Lista todos os alertas (suporta filtro por userId)
exports.getAlerts = async (req, res) => {
  try {
    const { userId } = req.query;
    const query = {};
    if (userId) {
      query.userId = userId;
    }
    const alerts = await Alert.find(query);
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/alerts/:id - Retorna um alerta por ID
exports.getAlertById = async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({ message: 'Alerta não encontrado' });
    }
    res.json(alert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/alerts - Cria um novo alerta
exports.createAlert = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const alert = new Alert(req.body);
    const savedAlert = await alert.save();
    res.status(201).json(savedAlert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/alerts/:id - Atualiza um alerta por ID
exports.updateAlert = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedAlert = await Alert.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAlert) {
      return res.status(404).json({ message: 'Alerta não encontrado' });
    }

    res.json(updatedAlert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/alerts/:id - Deleta um alerta por ID
exports.deleteAlert = async (req, res) => {
  try {
    const deletedAlert = await Alert.findByIdAndDelete(req.params.id);
    if (!deletedAlert) {
      return res.status(404).json({ message: 'Alerta não encontrado' });
    }
    res.json({ message: 'Alerta removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
