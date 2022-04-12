require("dotenv").config();

module.exports = {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    options: {
        dialect: process.env.DATABASE_RDB,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        timezone: "+09:00",
        logging: false,
    },
};
