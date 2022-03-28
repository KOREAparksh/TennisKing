require("dotenv").config();

module.exports = {
    development: {
        username: "root",
        password: null,
        database: process.env.DATABASE_NAME,
        options: {
            dialect: process.env.DATABASE_RDB,
            host: "127.0.0.1",
            port: 3306,
            timezone: "+09:00",
            logging: false,
        },
    },
    test: {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME + "_test",
        options: {
            dialect: process.env.DATABASE_RDB,
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
            timezone: "+09:00",
            logging: false,
        },
    },
    production: {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        options: {
            dialect: process.env.DATABASE_RDB,
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
            timezone: "+09:00",
        },
    },
};
