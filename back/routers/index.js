const express = require("express");
const router = express.Router();

const Place = require("../models/place");

router.get("/places", async (req, res) => {
    const places = await Place.findAll();
    places.every(place => place instanceof Place);
    res.json(places);
});

module.exports = router;