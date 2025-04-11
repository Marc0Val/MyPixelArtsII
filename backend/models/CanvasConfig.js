const mongoose = require("mongoose");

const canvasConfigSchema = new mongoose.Schema({
    width: { type: Number, default: 1000 },
    height: { type: Number, default: 1000 },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("CanvasConfig", canvasConfigSchema);
