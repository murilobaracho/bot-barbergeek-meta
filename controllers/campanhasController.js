const fs = require('fs');
const path = require('path');

const logger = require('../utils/logger');
const { enviarCampanha } = require('../campanhas');

const clientesPath = path.join(__dirname, '..', 'clientes.json');

exports.dispararCampanha = async (req, res) => {

    const { nome } = req.params;

    try {

        const clientes = JSON.parse(fs.readFileSync(clientesPath, 'utf8'));

        const resultados = [];

        for (const cliente of clientes) {

            try {

                await enviarCampanha(nome, cliente);

                resultados.push({ telefone: cliente.telefone, status: 'enviado' });

            } catch (e) {

                logger.error(`Falha ao enviar campanha "${nome}" para ${cliente.telefone}: ${e.response?.data ? JSON.stringify(e.response.data) : e.message}`);

                resultados.push({ telefone: cliente.telefone, status: 'erro', erro: e.response?.data?.error?.message || e.message });

            }

        }

        logger.info(`Campanha "${nome}" disparada para ${clientes.length} cliente(s).`);

        return res.status(200).json({ campanha: nome, resultados });

    } catch (e) {

        logger.error(`Erro ao disparar campanha "${nome}": ${e.message}`);

        return res.status(400).json({ erro: e.message });

    }

};
