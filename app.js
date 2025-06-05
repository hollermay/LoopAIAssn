const express = require('express');
const app = express();
const ingestionRoutes = require('./routes/routes');

app.use(express.json());
app.use('/', ingestionRoutes);

module.exports = app;
