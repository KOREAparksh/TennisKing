const Sequelize = require("@sequelize/core");

module.exports = class AuthCdInfo extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                auth_cd: {
                    type: Sequelize.STRING,
                    primaryKey: true,
                    allowNull: false,
                },
                create_time: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
                },
                update_time: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },
                use_yn: {
                    type: Sequelize.CHAR,
                    allowNull: false,
                    defaultValue: "Y",
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                modelName: "AuthCdInfo",
                tableName: "auth_cd_info",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_0900_ai_ci",
            }
        );
    }
};
