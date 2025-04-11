const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");

// Login del admin
router.post("/login", login);

module.exports = router;
