const express = require("express");
const router = express.Router();

const Reserve = require("../models/reserve");
const ReserveTime = require("../models/reserve_time");

router.post("/", async (req, res) => {
    const openTime = new Date(req.body.open_time);
    const placeId = parseInt(req.body.place_id, 10);
    const member = parseInt(req.body.member, 10);
    const facility = parseInt(req.body.use_facility, 10);
    const reserveTimes = req.body.reserve_times;

    const reserve = await Reserve.create({
        open_time: openTime,
        place_id: placeId,
        member: member,
        use_facility: facility,
    });

    Promise.all(
        reserveTimes.map((value) => {
            const hour = new Date(value).getHours();
            const receiptTime =
                parseInt(hour / 2, 10) -
                3 +
                (placeId === 1 ? 1833 : placeId === 2 ? 2210 : hour < 18 ? 2218 : hour === 18 ? 3305 : 2893);

            ReserveTime.create({
                reserve_id: reserve.id,
                receipt_date: new Date(value),
                receipt_time: receiptTime,
            });
        })
    ).then(() => res.status(200).json({ result: "ok" }));
});

module.exports = router;
