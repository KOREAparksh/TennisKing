const express = require("express");
const router = express.Router();

const Place = require("../models/place");
const Reserve = require("../models/reserve");
const ReserveTime = require("../models/reserve_time");

const terminus = require("../middlewares/terminus");
const ApiError = require("../modules/api.error");
const httpStatus = require("http-status");
// const logger = require("../modules/logger");
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
        } else {
            reserves.update({ status: 2 });
        }

        Promise.allSettled(
            reserves.ReserveTimes.map(async (value, idx) => {
                try {
                    if (value.dataValues.status !== 1 && value.dataValues.status !== 3) {
                        const intervalId = setInterval(() => {
                            getSessionId(reserves.login, reserves.password)
                                .then((sessionId) => {
                                    const start = new Date();
                                    getRentData(
                                        sessionId,
                                        reserves.Place.dataValues,
                                        value.dataValues,
                                        reserves.dataValues.member
                                    )
                                        .then((rentData) => {
                                            executeRent(value.dataValues.id, sessionId, rentData, start, intervalId);
                                        })
                                        .catch(async (err) => {
                                            const reserveTime = await ReserveTime.findOne({ where: { id: value.dataValues.id } });

                                            if (reserveTime.status === 0) reserveTime.update({ status: 2 });

                                            clearInterval(intervalId);
                                        });
                                })
                                .catch((err) => {
                                    Reserve.update({ status: 3 }, { where: { id: reserveId } });
                                    ReserveTime.update({ status: 2 }, { where: { reserve_id: reserveId } });
                                    clearInterval(intervalId);
                                });
                        }, 500);

                        setTimeout(async () => {
                            const executed = await Reserve.findOne({
                                include: [{ model: ReserveTime }],
                                where: { id: reserveId },
                            });

                            if (executed.dataValues.status !== 1 && executed.dataValues.status !== 3) {
                                executed.ReserveTimes.filter((value) => {
                                    if (value.status === 0) ReserveTime.update({ status: 2 }, { where: value.id });
                                });

                                executed.update({ status: 1 });
                            }

                            clearInterval(intervalId);
                            resolve();
                        }, 3 * 60 * 1000);
                    }
                } catch (err) {
                    // logger.reservationFail(
                    //     `ReserveId: ${reserves.id}, PlaceId: ${reserves.Place.id}, ReserveTimeId: ${value.dataValues.id}\n${err}`
                    // );
                }
            })
        ).then(async () => {
            const executed = await Reserve.findOne({
                include: [{ model: ReserveTime }],
                where: { id: reserveId },
            });

            if (
                executed.dataValues.status !== 1 &&
                executed.dataValues.status !== 3 &&
                executed.ReserveTimes.filter((value) => value.status === 0).length === 0
            ) {
                await executed.update({ status: 1 });
            } else if (
                executed.dataValues.status !== 1 &&
                executed.dataValues.status !== 3 &&
                executed.ReserveTimes.filter((value) => value.status === 0).length > 0
            ) {
                await executed.update({ status: 2 });
            }
        });

        return { status: httpStatus.OK, message: "OK" };
    })
);

module.exports = router;
