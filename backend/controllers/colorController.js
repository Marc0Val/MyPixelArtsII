const Color = require("../models/Color");
const Pixel = require("../models/Pixel"); // Importar el modelo Pixel

// Obtener todos los colores disponibles
exports.getAllColors = async (req, res) => {
    try {
        const colors = await Color.find({});
        res.json(colors);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los colores", error });
    }
};

// Agregar un nuevo color (solo admin más adelante)
exports.addColor = async (req, res) => {
    const { name, hex } = req.body;

    if (!name || !hex) {
        return res.status(400).json({ message: "Faltan datos del color" });
    }

    try {
        const color = new Color({ name, hex });
        await color.save();
        res.status(201).json(color);
    } catch (error) {
        res.status(500).json({ message: "Error al agregar el color", error });
    }
};

// Eliminar un color si no está en uso
exports.deleteColor = async (req, res) => {
    const { id } = req.params;

    try {
        const color = await Color.findById(id);
        if (!color) {
            return res.status(404).json({ message: "Color no encontrado" });
        }

        // ¿Está el color en uso en algún píxel?
        const used = await Pixel.exists({ color: color.hex });
        if (used) {
            return res.status(400).json({
                message: "No se puede eliminar el color: está siendo usado en el lienzo"
            });
        }

        await color.deleteOne();
        res.status(200).json({ message: "Color eliminado correctamente" });
    } catch (error) {
        // res.status(500).json({ message: "Error al eliminar el color", error });
        console.error("Error al eliminar el color:", error);
        res.status(500).json({ message: "Error al eliminar el color", error: error.message });
    }
};