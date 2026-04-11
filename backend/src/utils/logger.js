const { createLogger, format, transports } = require("winston");
const path = require("path");

const logger = createLogger({
    level: "info", 
    format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }), 
        format.json()
    ),
    transports: [
        // erreurs uniquement
        new transports.File({
            filename: path.join(__dirname, "../logs/error.log"),
            level: "error"
        }),

        // tous les logs
        new transports.File({
            filename: path.join(__dirname, "../logs/combined.log")
        })
    ]
});

// afficher en console en dev
if (process.env.NODE_ENV !== "production") {
    logger.add(
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        })
    );
}

module.exports = logger;