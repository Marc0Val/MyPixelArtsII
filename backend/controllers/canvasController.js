const CanvasConfig = require("../models/CanvasConfig");

// Obtener configuración actual
exports.getCanvasSize = async (req, res) => {
    try {
        const config = await CanvasConfig.findOne();
        if (!config) {
            const defaultConfig = await CanvasConfig.create({}); // 1000x1000 por defecto
            return res.json(defaultConfig);
        }
        res.json(config);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la configuración", error });
    }
};

// Actualizar tamaño del lienzo (ADMIN)
exports.updateCanvasSize = async (req, res) => {
    const { width, height } = req.body;
    if (width < 1000 || height < 1000) {
        return res.status(400).json({ message: "El tamaño mínimo es 1000x1000" });
    }

    try {
        const config = await CanvasConfig.findOneAndUpdate(
            {},
            { width, height, updatedAt: new Date() },
            { new: true, upsert: true }
        );
        res.json(config);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la configuración", error });
    }
};
