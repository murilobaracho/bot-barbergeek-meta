const respondidos = {};

const TEMPO = 10 * 60 * 1000;

function podeResponder(numero){

    const agora = Date.now();

    if(respondidos[numero] && agora - respondidos[numero] < TEMPO){

        return false;

    }

    respondidos[numero]=agora;

    return true;

}

module.exports={podeResponder};