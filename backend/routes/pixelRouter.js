const express = require("express");
const router = express.Router();
const { getAllPixels, paintPixel } = require("../controllers/pixelController");

router.get("/", getAllPixels);        // GET /pixels
router.post("/", paintPixel);         // POST /pixels

module.exports = router;
