const cooldown = new Map();

const TEMPO = Number(process.env.COOLDOWN_MINUTES || 60);

function podeResponder(numero) {

    const agora = Date.now();

    if (cooldown.has(numero)) {

        const ultimaResposta = cooldown.get(numero);

        const diferenca = agora - ultimaResposta;

        if (diferenca < TEMPO * 60 * 1000) {

            return false;

        }

    }

    cooldown.set(numero, agora);

    return true;

}

function limparCooldown(numero) {

    cooldown.delete(numero);

}

function limparTodos() {

    cooldown.clear();

}

module.exports = {

    podeResponder,

    limparCooldown,

    limparTodos

};