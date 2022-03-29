const { sequelize } = require("../models");
const axios = require("axios");

const Reserve = require("../models/reserve");

const logger = require("./logger");
const JWT = require("./jwt");

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
                    const executeOptions = {
                        method: "GET",
                        headers: { cookie: JWT.accessSign(), cookie: JWT.refreshSign() },
                        url: `${process.env.API_ENDPOINT}/execute/${value.id}`,
                    };

                    return axios(executeOptions).then((response) => response.data);
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
