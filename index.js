require('dotenv').config();

const express = require('express');

const logger = require('./utils/logger');

const webhookRoutes = require('./routes/webhook');

const app = express();

app.use(express.json());

app.use('/webhook', webhookRoutes);

app.get('/', (req, res) => {

    res.send('Bot Barbearia Geek Online');

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    logger.info(`Servidor iniciado na porta ${PORT}`);

});