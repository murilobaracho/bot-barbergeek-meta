require('dotenv').config();

const axios = require('axios');
const logger = require('../utils/logger');

async function enviarMensagem(numero, mensagem){

    try{

        await axios.post(

            `https://graph.facebook.com/v23.0/${process.env.PHONE_NUMBER_ID}/messages`,

            {

                messaging_product:"whatsapp",

                to:numero,

                type:"text",

                text:{
                    body:mensagem
                }

            },

            {

                headers:{
                    Authorization:`Bearer ${process.env.META_TOKEN}`,
                    "Content-Type":"application/json"
                }

            }

        );

        logger.info("Mensagem enviada para",numero);

    }catch(e){

        logger.error(e.response?.data || e.message);

    }

}

module.exports={enviarMensagem};