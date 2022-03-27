const express = require("express");
const router = express.Router();

const Place = require("../models/place");

router.get("/", async (req, res) => {
    res.json(await Place.findAll());
});

router.get('/:id', async (req, res) => {
    res.json(await Place.findOne({
        where: {
            id: req.params.id
        }
    }));
});

module.exports = router;
