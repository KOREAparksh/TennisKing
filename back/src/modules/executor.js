const {sequelize} = require("../models");
const logger = require("./logger");

const Sequelize = require("@sequelize/core");
const Reserve = require("../models/reserve");
const axios = require("axios");

(async function () {
  try {
    await sequelize.sync({force: false});
    console.log("🚀 Database connect successfully.");

    console.log(`Executor starts at ${(new Date()).toLocaleString()}`);
    const startTime = new Date();
    const endTime = (new Date()).setMinutes(startTime.getMinutes() + 10)
    const reserves = await Reserve.findAll({
      where: {
        open_time: {
          [Sequelize.Op.between]: [startTime, endTime],
        }
      }
    });

    const results = await Promise.allSettled(
      reserves.map(async (value) => {
          return axios.get(`${process.env.API_ENDPOINT}/execute/${value.id}`);
        }
      )
    );
    console.log(results);
  } catch (err) {
    logger.error(err);
  }
})();