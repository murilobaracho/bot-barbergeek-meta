const express = require('express');
const router = express.Router();

const {
    verifyWebhook,
    receiveMessage
} = require('../controllers/webhookController');

router.get('/', verifyWebhook);
router.post('/', receiveMessage);

module.exports = router;
