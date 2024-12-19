const winston = require('winston');

// Configuración del logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(), // Log en la consola
        new winston.transports.File({ filename: 'error.log', level: 'error' }), // Log de errores en un archivo
        new winston.transports.File({ filename: 'combined.log' }) // Log combinado
    ],
});

// Middleware para registrar las solicitudes
const requestLogger = (req, res, next) => {
    logger.info(`Solicitud: ${req.method} ${req.url}`);
    next();
};

// Middleware para registrar errores
const errorLogger = (err, req, res, next) => {
    logger.error(`Error: ${err.message}`);
    next(err);
};

module.exports = {
    logger,
    requestLogger,
    errorLogger,
};

