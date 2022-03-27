const Sequelize = require("@sequelize/core");
require("dotenv").config();

const Place = require("./place");
const Reserve = require("./reserve");
const ReserveTime = require("./reserve_time");
const AuthCdInfo = require("./auth_cd_info");

const env = process.env.NODE_ENV;
console.log(env);
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

Place.init(sequelize);
Reserve.init(sequelize);
ReserveTime.init(sequelize);
AuthCdInfo.init(sequelize);

module.exports = db;
