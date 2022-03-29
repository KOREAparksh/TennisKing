const { sequelize } = require("../models");
const logger = require("./logger");

const Reserve = require("../models/reserve");
const axios = require("axios");

(async function () {
    try {
        await sequelize.sync({ force: false });
        console.log("🚀 Database connect successfully.");
        console.log(`Executor starts at ${new Date().toLocaleString()}`);

        const reserves = await Reserve.findAll();
        const results = await Promise.allSettled(
            reserves.map(async (value) => {
                const now = new Date().getMinutes();
                const open = new Date(value.open_time).getMinutes();
                if (value.status !== 1 && open <= now && now <= open + 10) {
                    return axios.get(`${process.env.API_ENDPOINT}/execute/${value.id}`).then((response) => response.data);
                }
            })
        );

        if (results.length > 0) {
            logger.cron(`${JSON.stringify(results)}\n`);
        }
    } catch (err) {
        logger.cron(`${err}\n`);
    }
})();
