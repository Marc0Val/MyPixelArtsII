const mongoose = require("mongoose");

const pixelSchema = new mongoose.Schema({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    color: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now }
});

pixelSchema.index({ x: 1, y: 1 }, { unique: true }); // Asegura que cada posición (x,y) sea única

module.exports = mongoose.model("Pixel", pixelSchema);
