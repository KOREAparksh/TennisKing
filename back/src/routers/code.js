const express = require("express");
const router = express.Router();
require("dotenv").config();

const terminus = require("../middlewares/terminus");
const ApiError = require("../modules/api.error");
const JWT = require("../modules/jwt");
const { addZero } = require("../modules/datetime");

router.post(
    "/",
    terminus((req, res) => {
        const code = req.body.code;
        const month = addZero(new Date().getMonth() + 1);
        const day = addZero(new Date().getDate());

        if (code === `${process.env.CODE}${month}${day}`) {
            req.headers.changed = true;

            return { status: 200, message: "OK" };
        } else {
            throw new ApiError(401, "UnAuthorized");
        }
    })
);

module.exports = router;
