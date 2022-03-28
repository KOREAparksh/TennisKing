const express = require("express");
const router = express.Router();

const Place = require("../models/place");
const Reserve = require("../models/reserve");
const ReserveTime = require("../models/reserve_time");

const terminus = require("../middlewares/terminus");
const ApiError = require("../modules/api.error");
const httpStatus = require("http-status");
const logger = require("../modules/logger");
const getSessionId = require("../modules/login");
const { getRentData, executeRent } = require("../controllers/rent");

router.get(
    "/execute/:id",
    terminus(async (req, res) => {
        try {
            const reserveId = parseInt(req.params.id, 10);
            const reserves = await Reserve.findOne({
                include: [{ model: Place }, { model: ReserveTime }],
                where: { id: reserveId },
            });

            if (!reserves) throw new Error();

            const start = new Date();

            await Promise.all(
                reserves.ReserveTimes.map(async (value) => {
                    const sessionId = await getSessionId();
                    const rentData = await getRentData(
                        sessionId,
                        reserves.Place.dataValues,
                        value.dataValues,
                        reserves.dataValues.member
                    );

                    executeRent(value.dataValues.id, sessionId, rentData);
                })
            );

            const end = new Date();

            logger.reservationTime(
                `Total ${reserves.ReserveTimes.length} items were executed in ${(end - start) / 1000} seconds!!`
            );

            return { status: httpStatus.OK, message: "OK" };
        } catch (err) {
            throw new ApiError(httpStatus.BAD_REQUEST, "잘못된 요청입니다.");
        }
    })
);

module.exports = router;
