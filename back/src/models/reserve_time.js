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
                receipt_date: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                receipt_time: {
                    type: Sequelize.INTEGER,
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
                timestamps: true,
                underscored: true,
                modelName: "ReserveTime",
                tableName: "reserve_times",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_0900_ai_ci",
            }
        );
    }

    static associate(db) {
        ReserveTime.Reserve = db.ReserveTime.belongsTo(db.Reserve, {
            foreignKey: "reserve_id",
            sourceKey: "id",
        });
    }
};
