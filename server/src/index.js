require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Conectar ao DB
connectDB();

app.use(cors({
  origin: ["http://localhost:5173", "https://chinapulse-lyart.vercel.app"]
}));
app.use(express.json());

// Importar rotas
const trendRoutes = require('./routes/trendRoutes');
const productRoutes = require('./routes/productRoutes');
const alertRoutes = require('./routes/alertRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// Usar rotas
app.use('/api/trends', trendRoutes);
app.use('/api/products', productRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Seed na inicialização (opcional)
if (process.env.NODE_ENV !== 'production') {
  // Descomente a linha abaixo para rodar o seed automaticamente
  // seedData();
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
