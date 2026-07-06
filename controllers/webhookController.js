const fs = require('fs');
const path = require('path');

const { enviarMensagem } = require('../services/meta');
const { podeResponder } = require('../utils/cooldown');

const mensagem = fs.readFileSync(
    path.join(__dirname, './mensagem.txt'),
    'utf8'
);

exports.verifyWebhook = (req, res) => {

    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (
        mode === 'subscribe' &&
        token === process.env.VERIFY_TOKEN
    ) {

        console.log("Webhook verificado com sucesso.");
        return res.status(200).send(challenge);

    }

    return res.sendStatus(403);

};

exports.receiveMessage = async (req, res) => {

    try {

        const body = req.body;

        if (
            body.object !== 'whatsapp_business_account'
        ) {
            return res.sendStatus(404);
        }

        const entry = body.entry?.[0];
        const change = entry?.changes?.[0];

        const value = change?.value;

        if (!value?.messages) {
            return res.sendStatus(200);
        }

        const message = value.messages[0];

        const numero = message.from;

        const tipo = message.type;

        console.log("Mensagem recebida de:", numero);

        if (tipo !== "text") {

            console.log("Ignorando mídia");

            return res.sendStatus(200);

        }

        if (!podeResponder(numero)) {

            console.log("Cooldown ativo:", numero);

            return res.sendStatus(200);

        }

        try {

    const resultado = await enviarMensagem(numero, mensagem);

    console.log("Mensagem enviada!");
    console.log(resultado);

} catch (err) {

    console.error("Erro ao enviar:");
    console.error(err.response?.data || err.message);

}

        res.sendStatus(200);

    } catch (e) {

        console.log(e);

        res.sendStatus(500);

    }

};