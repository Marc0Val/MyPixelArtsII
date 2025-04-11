const CanvasConfig = require("../models/CanvasConfig");

// Obtener configuración actual del lienzo
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

    // Validación mínima de tamaño
    if (width < 1000 || height < 1000) {
        return res.status(400).json({ message: "El tamaño mínimo es 1000x1000" });
    }

    try {
        const currentConfig = await CanvasConfig.findOne();

        // Evitar reducción del lienzo
        if (currentConfig && (width < currentConfig.width || height < currentConfig.height)) {
            return res.status(400).json({
                message: `No se puede reducir el tamaño actual (${currentConfig.width}x${currentConfig.height})`
            });
        }

        // Actualización o creación
        const updatedConfig = await CanvasConfig.findOneAndUpdate(
            {},
            { width, height, updatedAt: new Date() },
            { new: true, upsert: true }
        );

        res.json(updatedConfig);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la configuración", error });
    }
};
