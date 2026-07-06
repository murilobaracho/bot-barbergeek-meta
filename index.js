require('dotenv').config();

const express = require('express');

const webhook = require('./routes/webhook');

const app = express();

app.use(express.json());

app.use('/webhook', webhook);

const PORT = 3000;

app.listen(PORT, () => {

    console.log("Servidor iniciado.");

});