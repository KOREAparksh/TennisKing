const express = require("express");
const router = express.Router();
const placeRouter = require("./place");
const rentRouter = require("./rent");
const reserveRouter = require("./reserve");
const codeRouter = require("./code");

const authorization = require("../middlewares/authorization");

router.use("/places", authorization, placeRouter);
router.use("/reserves", authorization, reserveRouter);
router.use("/rent", authorization, rentRouter);
router.use("/code", codeRouter);

module.exports = router;
