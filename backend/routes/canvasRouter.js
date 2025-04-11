const express = require("express");
const router = express.Router();
const {
    getCanvasSize,
    updateCanvasSize
} = require("../controllers/canvasController");
const requireAuth = require("../middlewares/authMiddleware"); // Middleware para proteger rutas
// Público
router.get("/", getCanvasSize);

// Protegido por admin (esto se protegerá con middleware después)
// router.put("/", updateCanvasSize);
router.put("/", requireAuth, updateCanvasSize); // Protegido por admin

module.exports = router;
