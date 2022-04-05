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
            return await Place.findAll({
                attributes: [
                    "id",
                    "com_name",
                    "comcd",
                    "part_name",
                    "partcd",
                    "place_name",
                    "placecd",
                    "facility"
                ],
            });
        } catch (err) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Bad Request");
        }
    })
);

router.get(
    "/:id",
    terminus(async (req, res) => {
        try {
            return await Place.findByPk(parseInt(req.params.id), {
                attributes: [
                    "id",
                    "com_name",
                    "comcd",
                    "part_name",
                    "partcd",
                    "place_name",
                    "placecd",
                    "facility"
                ],
            });
        } catch (err) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Bad Request");
        }
    })
);

module.exports = router;
