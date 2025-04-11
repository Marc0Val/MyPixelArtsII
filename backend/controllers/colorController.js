const Color = require("../models/Color");

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
