const express = require("express");
const router = express.Router();
const placeRouter = require("./place");
const rentRouter = require("./rent");
const reserveRouter = require("./reserve");

router.use("/places", placeRouter);
router.use("/reserves", reserveRouter);
router.use("/rent", rentRouter);

module.exports = router;
