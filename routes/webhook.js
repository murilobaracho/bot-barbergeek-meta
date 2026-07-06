const express = require('express');
const router = express.Router();

const webhookController = require('../controllers/webhookController');

// Verificação do webhook (Meta)
router.get('/', webhookController.verifyWebhook);

// Recebimento das mensagens
router.post('/', webhookController.receiveMessage);

module.exports = router;