const express = require('express');
const app = express();
const autenticacionRoutes = require('./routes/AutenticacionRoute')

// Middlewares globales
app.use(express.json());

// Rutas
app.use('/', autenticacionRoutes);

// Exporta la app para que pueda ser usada en los tests
module.exports = app;
