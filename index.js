require('dotenv').config();

const express = require('express');

const logger = require('./utils/logger');

const webhookRoutes = require('./routes/webhook');
const campanhasRoutes = require('./routes/campanhas');

const app = express();

app.use(express.json());

app.use('/webhook', webhookRoutes);
app.use('/campanhas', campanhasRoutes);

app.get('/', (req, res) => {

    res.send('Bot Barbearia Geek Online');

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    logger.info(`Servidor iniciado na porta ${PORT}`);

});