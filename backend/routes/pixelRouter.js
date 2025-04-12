const express = require("express");
const router = express.Router();
const { getAllPixels, paintPixel, deleteAllPixels } = require("../controllers/pixelController");
const requireAuth = require("../middlewares/authMiddleware");

router.get("/", getAllPixels);        // GET /pixels
router.post("/", paintPixel);         // POST /pixels
router.delete("/", requireAuth, deleteAllPixels); // DELETE /pixels (solo admin)

module.exports = router;
