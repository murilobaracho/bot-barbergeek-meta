const fs = require('fs');
const path = require('path');

const { createLogger, format, transports } = require('winston');

const logsFolder = path.join(__dirname, '..', 'logs');

if (!fs.existsSync(logsFolder)) {
    fs.mkdirSync(logsFolder);
}

const logger = createLogger({

    level: 'info',

    format: format.combine(

        format.timestamp({

            format: 'DD/MM/YYYY HH:mm:ss'

        }),

        format.printf(info => {

            return `[${info.timestamp}] ${info.level.toUpperCase()} - ${info.message}`;

        })

    ),

    transports: [

        new transports.Console(),

        new transports.File({

            filename: path.join(logsFolder, 'bot.log')

        })

    ]

});

module.exports = logger;