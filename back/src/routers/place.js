const express = require("express");
const router = express.Router();

const Place = require("../models/place");

const terminus = require("../middlewares/terminus");
const ApiError = require("../modules/api.error");
const httpStatus = require("http-status");

router.get(
    "/",
    terminus(async (req, res) => {
        try {
            return await Place.findAll();
        } catch (err) {
            throw new ApiError(httpStatus.BAD_REQUEST, err);
        }
    })
);

router.get(
    "/:id",
    terminus(async (req, res) => {
        try {
            return await Place.findByPk(parseInt(req.params.id));
        } catch (err) {
            throw new ApiError(httpStatus.BAD_REQUEST, err);
        }
    })
);

module.exports = router;
