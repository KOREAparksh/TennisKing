const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT = {
    accessSign: () =>
        jwt.sign({}, process.env.ACCESS_SECRET, {
            algorithm: "HS256",
            expiresIn: "30m",
        }),

    refreshSign: () =>
        jwt.sign({}, process.env.REFRESH_SECRET, {
            algorithm: "HS256",
            expiresIn: "30d",
        }),

    accessVerify: (accessToken, refreshToken) => {
        try {
            jwt.verify(accessToken, process.env.ACCESS_SECRET);
            return { valid: true };
        } catch (err) {
            if (err.message === "jwt expired") {
                return {
                    valid: false,
                    changed: JWT.refreshVerity(accessToken, refreshToken).valid,
                };
            } else {
                return { valid: false };
            }
        }
    },

    refreshVerity: (accessToken, refreshToken) => {
        try {
            jwt.verify(refreshToken, process.env.REFRESH_SECRET);
            return { valid: true };
        } catch (err) {
            if (err.message === "jwt expired") {
                return {
                    valid: false,
                    changed: JWT.accessVerify(accessToken, refreshToken).valid,
                };
            } else {
                return { valid: false };
            }
        }
    },
};

module.exports = JWT;
