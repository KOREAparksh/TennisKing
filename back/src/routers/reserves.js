const express = require("express");
const router = express.Router();

const Place = require("../models/place");

router.post("/", async (req, res) => {
    const getDate = (value) => {
        const date = new Date(value);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const addZero = (num) => (num < 10 ? `0${num}` : `${num}`);

        return `${year}${addZero(month)}${addZero(day)}`;
    };
    const openTime = new Date(req.body.open_time);
    const placeId = parseInt(req.body.place_id, 10);
    const member = parseInt(req.body.member, 10);
    const facility = parseInt(req.body.use_facility, 10);
    const reserveTimes = req.body.reserve_times;

    /** 이쯤에서 위 데이터로 reserves 테이블에 INSERT */
    /** 위의 테이블 INSERT 후 반환값으로 row id 를 받으면 밑에 map 함수에서 사용 */

    reserveTimes.map((value) => {
        const receiptDate = getDate(value);
        const hour = new Date(value).getHours();
        const receiptTime =
            parseInt(hour / 2, 10) -
            3 +
            (placeId === 1 ? 1833 : placeId === 2 ? 2210 : hour < 18 ? 2218 : hour === 18 ? 3311 : 2900);

        /** 이쯤에서 위 데이터를 이용해 reserve_times 테이블에 INSERT */
    });
});

module.exports = router;
