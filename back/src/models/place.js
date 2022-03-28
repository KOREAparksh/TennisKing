const Sequelize = require("@sequelize/core");

module.exports = class Place extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                com_name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                comcd: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                part_name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                partcd: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                place_name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                placecd: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                facility: {
                    type: Sequelize.TINYINT,
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                modelName: "Place",
                tableName: "places",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        db.Place.hasMany(db.Reserve, {
            foreignKey: "place_id",
            sourceKey: "id",
        });
    }
};
