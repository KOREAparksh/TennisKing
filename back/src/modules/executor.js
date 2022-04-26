const { sequelize } = require("../models");
const axios = require("axios");

const Reserve = require("../models/reserve");

// const logger = require("./logger");
const JWT = require("./jwt");

(async function () {
    try {
        await sequelize.sync({ force: false });
        console.log("🚀 Database connect successfully.");
        console.log(`Executor starts at ${new Date().toLocaleString()}`);

        const reserves = await Reserve.findAll();

        reserves.map((value) => {
            const now = new Date();
            const open = new Date(value.open_time);

            if (value.status !== 1 && value.status !== 3 && open <= now && now <= new Date(Date.parse(open) + 5 * 60 * 1000)) {
                const executeOptions = {
                    method: "GET",
                    headers: { cookie: `access=${JWT.accessSign()}; refresh=${JWT.refreshSign()};` },
                    url: `${process.env.API_ENDPOINT}/rent/execute/${value.id}`,
                };

                axios(executeOptions);
            }
        });
    } catch (err) {
        console.log(err);
    }
})();
