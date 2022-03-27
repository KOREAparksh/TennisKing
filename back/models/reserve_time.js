const Sequelize = require("@sequelize/core");

module.exports = class ReserveTime extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                reserve_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                time: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                status: {
                    type: Sequelize.TINYINT,
                    allowNull: false,
                    defaultValue: 0,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: true,
                modelName: "ReserveTime",
                tableName: "reserve_times",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_0900_ai_ci",
            }
        );
    }
};
