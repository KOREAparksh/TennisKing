const express = require("express");
const router = express.Router();
const placeRouter = require("./places");
const rentRouter = require("./rent");
const reserveRouter = require("./reserves");

router.use("/places", placeRouter);
router.use("/rents", rentRouter);
router.use("/reserves", reserveRouter);

module.exports = router;
