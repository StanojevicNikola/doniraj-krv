const winston = require('winston');

const { format } = winston;
const {
    printf, timestamp, combine, colorize,
} = format;

const customFormat = printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`);

class WinstonLogger {
    constructor() {
        this.instance = winston.createLogger({
            level: 'debug',
            format: combine(
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss.ms' }),
                customFormat,
            ),
            transports: [
                new winston.transports.File({
                    filename: 'logs/error.log',
                    level: 'error',
                    format: combine(
                        format((info) => {
                            // eslint-disable-next-line no-param-reassign
                            info.level = info.level.toUpperCase();
                            return info;
                        })(),
                        timestamp({ format: 'YYYY-MM-DD HH:mm:ss.ms' }),
                        customFormat,
                    ),
                }),
                new winston.transports.File({
                    filename: 'logs/combined.log',
                    format: combine(
                        format((info) => {
                            // eslint-disable-next-line no-param-reassign
                            info.level = info.level.toUpperCase();
                            return info;
                        })(),
                        timestamp({ format: 'YYYY-MM-DD HH:mm:ss.ms' }),
                        customFormat,
                    ),
                }),
                new winston.transports.Console({
                    format: combine(
                        colorize(),
                        timestamp({ format: 'YYYY-MM-DD HH:mm:ss.ms' }),
                        customFormat,
                    ),
                }),
            ],
        });
    }

    info(message) {
        this.instance.info(message);
    }

    error(message) {
        this.instance.error(message);
    }

    warn(message) {
        this.instance.warn(message);
    }

    debug(message) {
        this.instance.debug(message);
    }
}


module.exports = WinstonLogger;
