const winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file");

const { combine, timestamp, printf } = winston.format;

const devOption = {
    console() {
        if (process.env.NODE_ENV === "production") {
            infoLog.add(
                new winston.transports.Console({
                    format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
                })
            );
        }
    },
};

const logFormat = printf((info) => {
    return `${info.timestamp} || [${info.level}] || ${info.message}`;
});

const formatOption = combine(
    timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
);

const errorLog = winston.createLogger({
    level: "error",
    format: formatOption,
    transports: [
        new winstonDaily({
            level: "error",
            datePattern: "YYYY-MM-DD",
            dirname: "logs/error",
            filename: "%DATE%.error.log",
            maxFiles: "7d",
            zippedArchive: true,
        }),
    ],
});

const warnLog = winston.createLogger({
    level: "warn",
    format: formatOption,
    transports: [
        new winstonDaily({
            level: "warn",
            datePattern: "YYYY-MM-DD",
            dirname: "logs/warn",
            filename: "%DATE%.warn.log",
            maxFiles: "7d",
            zippedArchive: true,
        }),
    ],
});

const httpLog = winston.createLogger({
    level: "http",
    format: formatOption,
    transports: [
        new winstonDaily({
            level: "http",
            datePattern: "YYYY-MM-DD",
            dirname: "logs/http",
            filename: "%DATE%.http.log",
            maxFiles: "7d",
            zippedArchive: true,
        }),
    ],
});

const infoLog = winston.createLogger({
    level: "info",
    format: formatOption,
    transports: [
        new winstonDaily({
            level: "info",
            datePattern: "YYYY-MM-DD",
            dirname: "logs/info",
            filename: "%DATE%.info.log",
            maxFiles: "7d",
            zippedArchive: true,
        }),
    ],
});

const reservationLog = winston.createLogger({
    level: "info",
    format: formatOption,
    transports: [
        new winstonDaily({
            level: "info",
            datePattern: "YYYY-MM-DD",
            dirname: "logs/reservation",
            filename: "%DATE%.reservation.log",
            maxFiles: "7d",
            zippedArchive: true,
        }),
    ],
});

const reservationFailLog = winston.createLogger({
    level: "info",
    format: formatOption,
    transports: [
        new winstonDaily({
            level: "info",
            datePattern: "YYYY-MM-DD",
            dirname: "logs/reservation_fail",
            filename: "%DATE%.reservation.fail.log",
            maxFiles: "7d",
            zippedArchive: true,
        }),
    ],
});

const reservationTimeLog = winston.createLogger({
    level: "info",
    format: formatOption,
    transports: [
        new winstonDaily({
            level: "info",
            datePattern: "YYYY-MM-DD",
            dirname: "logs/reservation_time",
            filename: "%DATE%.reservation.time.log",
            maxFiles: "7d",
            zippedArchive: true,
        }),
    ],
});

const logger = {
    error(message) {
        infoLog.error(message);
        return errorLog.error(message);
    },

    warn(message) {
        infoLog.warn(message);
        return warnLog.warn(message);
    },

    reservation(message) {
        return reservationLog.info(message);
    },

    reservationFail(message) {
        return reservationFailLog.info(message);
    },

    reservationTime(message) {
        return reservationTimeLog.info(message);
    },

    http(message) {
        return httpLog.http(message);
    },

    stream: {
        write: (message) => {
            logger.http(message);
        },
    },
};

devOption.console();

module.exports = logger;
