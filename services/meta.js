async function enviarMensagem(numero, texto) {

    if (!texto || texto.trim() === "") {
        throw new Error("A mensagem está vazia.");
    }

    const response = await axios.post(
        `https://graph.facebook.com/v23.0/${process.env.PHONE_NUMBER_ID}/messages`,
        {
            messaging_product: "whatsapp",
            to: numero,
            type: "text",
            text: {
                body: texto
            }
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.META_TOKEN}`,
                "Content-Type": "application/json"
            }
        }
    );

    return response.data;
}

module.exports = { enviarMensagem };