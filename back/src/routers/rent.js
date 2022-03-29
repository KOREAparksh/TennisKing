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
        const reserveId = parseInt(req.params.id, 10);
        const reserves = await Reserve.findOne({
            include: [{ model: Place }, { model: ReserveTime }],
            where: { id: reserveId },
        });

        if (!reserves) {
            throw new ApiError(httpStatus.BAD_REQUEST, "잘못된 요청입니다.");
        }

        Promise.allSettled(
            reserves.ReserveTimes.map(async (value) => {
                try {
                    if (value.dataValues.status !== 1) {
                        const start = new Date();
                        const sessionId = await getSessionId();
                        const rentData = await getRentData(
                            sessionId,
                            reserves.Place.dataValues,
                            value.dataValues,
                            reserves.dataValues.member
                        );

                        await executeRent(value.dataValues.id, sessionId, rentData, start);

                        const executed = await Reserve.findOne({
                            include: [{ model: ReserveTime }],
                            where: { id: reserveId },
                        });
                        if (executed.reserveTimes.filter((value) => value.status !== 1).length === 0) {
                            await Reserve.update({ status: 1 }, { where: { id: reserveId } });
                        } else {
                            await Reserve.update({ status: 2 }, { where: { id: reserveId } });
                        }
                    }
                } catch (err) {
                    logger.reservationFail(
                        `ReserveId: ${reserves.id}, PlaceId: ${reserves.Place.id}, ReserveTimeId: ${value.dataValues.id}\n${err}`
                    );
                }
            })
        );

        return { status: httpStatus.OK, message: "OK" };
    })
);

module.exports = router;
