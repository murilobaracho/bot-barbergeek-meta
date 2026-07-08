const fs = require("fs");
const path = require("path");

const { enviarTemplate } = require("./services/meta");

async function enviarCampanha(nomeCampanha, cliente){

    const arquivo = path.join(
        __dirname,
        "..",
        "templates",
        `${nomeCampanha}.json`
    );

    if(!fs.existsSync(arquivo))
        throw new Error("Template não encontrado.");

    const template = JSON.parse(
        fs.readFileSync(arquivo,"utf8")
    );

    const parametros = template.variables.map(campo=>({

        type:"text",

        text:String(cliente[campo] || "")

    }));

    return enviarTemplate(

        cliente.telefone,

        template.name,

        template.language,

        parametros

    );

}

module.exports={enviarCampanha};