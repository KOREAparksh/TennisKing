const express = require("express");
const router = express.Router();
const placeRouter = require("./places");
const rentRouter = require("./rent");
const reserveRouter = require("./reserves");

router.use("/places", placeRouter);
router.use("/reserves", reserveRouter);
router.use("/rent", rentRouter);

module.exports = router;