require("dotenv").config();

module.exports = {
    development: {
        username: "root",
        password: null,
        database: process.env.DATABASE_NAME,
        host: "127.0.0.1",
        dialect: "mysql",
        logging: false,
    },
    test: {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME + "_test",
        host: process.env.DATABASE_HOST,
        dialect: process.env.DATABASE_RDB,
        port: process.env.DATABASE_PORT,
    },
    production: {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        dialect: process.env.DATABASE_RDB,
        port: process.env.DATABASE_PORT,
    },
};
