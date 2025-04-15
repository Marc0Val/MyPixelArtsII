const Pixel = require("../models/Pixel");
const CanvasConfig = require("../models/CanvasConfig"); // ← IMPORTANTE

exports.getAllPixels = async (req, res) => {
    try {
        const pixels = await Pixel.find({});
        res.json(pixels);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener píxeles", error });
    }
};

exports.paintPixel = async (req, res) => {
    const { x, y, color } = req.body;

    if (
        x === undefined || y === undefined || !color ||
        x < 0 || y < 0
    ) {
        return res.status(400).json({ message: "Datos inválidos" });
    }

    try {
        // 🔍 Obtener configuración del lienzo actual
        const config = await CanvasConfig.findOne();
        const maxX = config?.width || 1000;
        const maxY = config?.height || 1000;

        // ❌ Validar si está fuera del lienzo
        if (x >= maxX || y >= maxY) {
            return res.status(400).json({
                message: `El píxel está fuera del rango permitido: (${maxX}x${maxY})`
            });
        }

        // ✅ Actualizar o crear el píxel
        const updatedPixel = await Pixel.findOneAndUpdate(
            { x, y },
            { color, updatedAt: new Date() },
            { new: true, upsert: true }
        );

        res.status(200).json(updatedPixel);
    } catch (error) {
        res.status(500).json({ message: "Error al pintar el píxel", error });
    }
};

exports.deleteAllPixels = async (req, res) => {
    try {
        const result = await Pixel.deleteMany({});
        res.status(200).json({
            message: `Lienzo limpiado exitosamente.`,
            deletedCount: result.deletedCount
        });
    } catch (error) {
        console.error("Error al borrar el lienzo:", error);
        res.status(500).json({ message: "Error al borrar el lienzo", error: error.message });
    }
};

exports.getPixelsInRegion = async (req, res) => {
    try {
        const { minX, maxX, minY, maxY } = req.query;

        if (
            isNaN(minX) || isNaN(maxX) || isNaN(minY) || isNaN(maxY)
        ) {
            return res.status(400).json({ message: "Parámetros inválidos" });
        }

        const pixels = await Pixel.find({
            x: { $gte: parseInt(minX), $lte: parseInt(maxX) },
            y: { $gte: parseInt(minY), $lte: parseInt(maxY) },
        });

        res.status(200).json(pixels);
    } catch (error) {
        console.error("Error al obtener píxeles por región:", error);
        res.status(500).json({ message: "Error al obtener píxeles por región", error });
    }
};
