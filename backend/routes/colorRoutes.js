const express = require("express");
const router = express.Router();
const {
    getAllColors,
    addColor
} = require("../controllers/colorController");
const requireAuth = require("../middlewares/authMiddleware");

// Público: obtener colores
router.get("/", getAllColors);

// Admin (más adelante): agregar color
// router.post("/", addColor);
router.post("/", requireAuth, addColor); 

module.exports = router;
