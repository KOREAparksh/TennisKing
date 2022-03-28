const express = require("express");
const router = express.Router();
require("dotenv").config();

const terminus = require("../middlewares/terminus");
const JWT = require("../modules/jwt");
const ApiError = require("../modules/api.error");
const httpStatus = require("http-status");
const { addZero } = require("../modules/datetime");

router.post(
    "/",
    terminus((req, res) => {
        const code = req.body.code;
        const month = addZero(new Date().getMonth() + 1);
        const day = addZero(new Date().getDate());

        if (code === `${process.env.CODE}${month}${day}`) {
            req.headers.changed = true;

            return { status: httpStatus.OK, message: "OK" };
        } else {
            throw new ApiError(httpStatus.UNAUTHORIZED, "UnAuthorized");
        }
    })
);

module.exports = router;
