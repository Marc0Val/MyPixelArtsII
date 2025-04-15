const express = require("express");
const router = express.Router();
const {
    getAllPixels,
    paintPixel,
    deleteAllPixels,
    getPixelsInRegion,
} = require("../controllers/pixelController");

const requireAuth = require("../middlewares/authMiddleware");

router.get("/region", getPixelsInRegion); // GET /pixels/region
router.get("/", getAllPixels);            // GET /pixels
router.post("/", paintPixel);             // POST /pixels
router.delete("/", requireAuth, deleteAllPixels); // DELETE /pixels (admin only)


module.exports = router;
