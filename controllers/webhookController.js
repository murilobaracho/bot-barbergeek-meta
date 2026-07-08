const fs = require('fs');
const path = require('path');

const logger = require('../utils/logger');

const { enviarMensagem } = require('../services/meta');
const { podeResponder } = require('../utils/cooldown');

// Carrega a mensagem automática
const mensagem = fs.readFileSync(
    path.join(__dirname, '..', 'mensagem.txt'),
    'utf8'
).trim();

exports.verifyWebhook = (req, res) => {

    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (
        mode === 'subscribe' &&
        token === process.env.VERIFY_TOKEN
    ) {

        logger.info("Webhook verificado com sucesso.");

        return res.status(200).send(challenge);

    }

    logger.warn("Tentativa de verificação inválida.");

    return res.sendStatus(403);

};

exports.receiveMessage = async (req, res) => {

    try {

        logger.info("Webhook recebido.");

        const body = req.body;

        // Apenas eventos do WhatsApp
        if (body.object !== 'whatsapp_business_account') {

            return res.sendStatus(404);

        }

        const entry = body.entry?.[0];

        const change = entry?.changes?.[0];

        const value = change?.value;

        if (!value) {

            return res.sendStatus(200);

        }

        // Ignora status de mensagens
        if (value.statuses) {

            return res.sendStatus(200);

        }

        // Não existe mensagem
        if (!value.messages) {

            return res.sendStatus(200);

        }

        const message = value.messages[0];

        // Apenas texto
        if (message.type !== "text") {

            logger.info("Mensagem ignorada (não é texto).");

            return res.sendStatus(200);

        }

        const numero = message.from;

        const textoRecebido = message.text?.body || "";

        logger.info(`Mensagem recebida de ${numero}`);
        logger.info(`Texto: ${textoRecebido}`);

        // Cooldown
        if (!podeResponder(numero)) {

            logger.info(`Cooldown ativo para ${numero}`);

            return res.sendStatus(200);

        }

        await enviarMensagem(numero, mensagem);

        logger.info(`Resposta enviada para ${numero}`);

        return res.sendStatus(200);

    } catch (e) {

        logger.error(e.response?.data || e.message);

        return res.sendStatus(500);

    }

};