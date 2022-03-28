const express = require("express");
const router = express.Router();

const Place = require("../models/place");
const Reserve = require("../models/reserve");
const ReserveTime = require("../models/reserve_time");

const getSessionId = require("../modules/login");
const getRentData = require("../modules/rentInput");
const executeRent = require("../modules/rent");

router.post("/execute", async (req, res) => {
    try {
        const reserveId = parseInt(req.body.reserve_id, 10);
        /**
         * 예약 정보, 테니스장 정보 inner join을 통해 한번에 갖고옴
         */
        const reserves = await Reserve.findOne({
            include: [{ model: Place }, { model: ReserveTime }],
            where: { id: reserveId },
        });

        Promise.all(
            reserves.ReserveTimes.map(async (value) => {
                const sessionId = await getSessionId();

                executeRent(
                    sessionId,
                    await getRentData(sessionId, reserves.Place.dataValues, value.dataValues, reserves.dataValues.member)
                );
            })
        )
            .then((value) => {
                res.send("ok");
            })
            .catch((err) => {
                res.send("fail");
            });
    } catch (err) {
        console.log(err);
        res.status(400).json({ status: 400, message: "잘못된 요청입니다." });
    }
});

module.exports = router;
