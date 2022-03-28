const Sequelize = require("@sequelize/core");

const Place = require("./place");
const Reserve = require("./reserve");
const ReserveTime = require("./reserve_time");
const AuthCdInfo = require("./auth_cd_info");

const env = process.env.NODE_ENV;
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config.options);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Place = Place;
db.Reserve = Reserve;
db.ReserveTime = ReserveTime;

Place.init(sequelize);
Reserve.init(sequelize);
ReserveTime.init(sequelize);
AuthCdInfo.init(sequelize);

Place.associate(db);
Reserve.associate(db);
ReserveTime.associate(db);

module.exports = db;
