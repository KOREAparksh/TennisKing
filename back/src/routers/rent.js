const express = require("express");
const router = express.Router();

router.post("/execute", (req, res) => {
    const reserveId = parseInt(req.body.reserve_id, 10);

    /**
     * reserve_id로 reserves 테이블 조회 후
     * reserve_id를 foerign key로 갖고있는 reserve_times 테이블 데이터 모두 조회
     */

    /** 여기에 reserves 테이블의 place_id로 places 테이블 조회한 데이터 필요 */
});

module.exports = router;
