const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const assetsRouter = require('./routes/assets');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/assets', assetsRouter);

module.exports = app;