const express = require("express");
const router = express.Router();
const { Op } = require('@sequelize/core');

const Place = require("../models/place");
const Reserve = require("../models/reserve");
const ReserveTime = require("../models/reserve_time");

const terminus = require("../middlewares/terminus");
const ApiError = require("../modules/api.error");
const httpStatus = require("http-status");
const { getReserveData, toResponse } = require("../controllers/reserve");

router.post(
    "/",
    terminus(async (req, res) => {
        try {
            const reserveData = getReserveData(req);
            const place = await Place.findByPk(reserveData.place_id);
            if (place == null) {
                throw "Absent Place";
            }
            await Reserve.create(reserveData, {
                include: [{
                    association: Reserve.ReserveTime,
                }]
            })
            return { status: httpStatus.OK, message: "OK" };
        } catch (err) {
            throw new ApiError(httpStatus.BAD_REQUEST, err);
        }
    })
);

router.get(
    "/",
    terminus(async (req, res) => {
        try {
            const reserves = await Reserve.findAll({
                attributes: [
                    "id",
                    "open_time",
                    "place_id",
                    "member",
                    "use_facility",
                ],
                include: [{
                    model: ReserveTime,
                    attributes: [ ["receipt_date", "time"], "status"],
                }],
            });
            return reserves.map(reserve => {
                return toResponse(reserve);
            });
        } catch (err) {
            throw new ApiError(httpStatus.BAD_REQUEST, err);
        }
    })
);

router.get(
    "/:id",
    terminus(async (req, res) => {
        try {
            const reserve = await Reserve.findByPk(parseInt(req.params.id, 10), {
                attributes: [
                    "id",
                    "open_time",
                    "place_id",
                    "member",
                    "use_facility"
                ],
                include: [{
                    model: ReserveTime,
                    attributes: [ ["receipt_date", "time"], "status"],
                }],
            });
            if (reserve == null) {
                throw "Failed Query";
            }
            return toResponse(reserve);
        } catch (err) {
            throw new ApiError(httpStatus.BAD_REQUEST, err);
        }
    })
);

router.patch(
    "/:id",
    terminus(async (req, res) => {
        try {
            const reserve = await Reserve.findByPk(parseInt(req.params.id, 10))
            const today = new Date();
            if (today > new Date(reserve.open_time)) {
                throw "Too Late To Change It"
            }
            const reserveData = await getReserveData(req);
            await Promise.all([
                ReserveTime.destroy({
                    where: {
                        reserve_id: reserve.id,
                        receipt_date: {
                        [Op.or]: reserveData.delete_reserve_times.map(reserveTime => {
                            return reserveTime.receipt_date
                        })
                        }
                    }
                }),
                reserveData.new_reserve_times.map(reserveTime => {
                    reserveTime.reserve_id = reserve.id;
                    ReserveTime.create(reserveTime);
                }),
                reserve.update(reserveData)
            ]);
            return { status: httpStatus.OK, message: "OK" };
        } catch (err) {
            throw new ApiError(httpStatus.BAD_REQUEST, err);
        }
    })
);

router.delete(
    "/:id",
    terminus(async (req, res) => {
        try {
            await Reserve
            .findByPk(parseInt(req.params.id, 10))
            .then(reserve => {
                if (reserve == null)
                    throw "Absent Reserve";
                const today = new Date();
                if (today > new Date(reserve.open_time)) {
                    throw "Too Late To Delete It"
                }
                reserve.destroy({
                    where: { id: req.params.id },
                    force: true,
                })
            });
            return { status: httpStatus.OK, message: "OK" };
        } catch (err) {
            throw new ApiError(httpStatus.BAD_REQUEST, err);
        }
    })
);

module.exports = router;
