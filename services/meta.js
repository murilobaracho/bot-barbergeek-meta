require('dotenv').config();

const axios = require('axios');
const logger = require('../utils/logger');

async function enviarMensagem(numero, mensagem) {

    try {

        if (!mensagem || mensagem.trim() === "") {
            throw new Error("Tentativa de enviar mensagem vazia.");
        }

        const response = await axios.post(

            `https://graph.facebook.com/v23.0/${process.env.PHONE_NUMBER_ID}/messages`,

            {
                messaging_product: "whatsapp",

                recipient_type: "individual",

                to: numero,

                type: "text",

                text: {
                    preview_url: false,
                    body: mensagem
                }

            },

            {

                headers: {

                    Authorization: `Bearer ${process.env.META_TOKEN}`,

                    "Content-Type": "application/json"

                }

            }

        );

        logger.info(`Mensagem enviada para ${numero}`);

        return response.data;

    } catch (e) {

        logger.error("Erro ao enviar mensagem:");

        logger.error(
            JSON.stringify(
                e.response?.data || e.message,
                null,
                2
            )
        );

        throw e;

    }

}

async function enviarTemplate(numero, nomeTemplate, idioma, parametros) {

    try {

        const response = await axios.post(

            `https://graph.facebook.com/v23.0/${process.env.PHONE_NUMBER_ID}/messages`,

            {
                messaging_product: "whatsapp",

                recipient_type: "individual",

                to: numero,

                type: "template",

                template: {
                    name: nomeTemplate,

                    language: {
                        code: idioma
                    },

                    components: parametros.length > 0 ? [
                        {
                            type: "body",
                            parameters: parametros
                        }
                    ] : []
                }

            },

            {

                headers: {

                    Authorization: `Bearer ${process.env.META_TOKEN}`,

                    "Content-Type": "application/json"

                }

            }

        );

        logger.info(`Template "${nomeTemplate}" enviado para ${numero}`);

        return response.data;

    } catch (e) {

        logger.error(`Erro ao enviar template "${nomeTemplate}" para ${numero}:`);

        logger.error(
            JSON.stringify(
                e.response?.data || e.message,
                null,
                2
            )
        );

        throw e;

    }

}

module.exports = {
    enviarMensagem,
    enviarTemplate
};