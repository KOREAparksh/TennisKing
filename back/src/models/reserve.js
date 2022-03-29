const Sequelize = require("@sequelize/core");

module.exports = class Reserve extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                open_time: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                member: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                place_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                use_facility: {
                    type: Sequelize.TINYINT,
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
                modelName: "Reserve",
                tableName: "reserves",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_0900_ai_ci",
            }
        );
    }

    static associate(db) {
        Reserve.ReserveTime = db.Reserve.hasMany(db.ReserveTime, {
            foreignKey: "reserve_id",
            sourceKey: "id",
        });

        db.Reserve.belongsTo(db.Place, {
            foreignKey: "place_id",
            sourceKey: "id",
        });
    }
};
