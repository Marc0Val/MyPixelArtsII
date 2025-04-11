const mongoose = require("mongoose");
const Color = require("../models/Color");

const colors = [
    { name: "Rojo", hex: "#FF0000" },
    { name: "Verde", hex: "#00FF00" },
    { name: "Azul", hex: "#0000FF" },
    { name: "Amarillo", hex: "#FFFF00" },
    { name: "Cian", hex: "#00FFFF" },
    { name: "Magenta", hex: "#FF00FF" },
    { name: "Negro", hex: "#000000" },
    { name: "Blanco", hex: "#FFFFFF" },
    { name: "Gris", hex: "#808080" },
    { name: "Naranja", hex: "#FFA500" }
];

async function populate() {
    try {
        await mongoose.connect("your_mongo_uri_conection", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        for (const color of colors) {
            const exists = await Color.findOne({ hex: color.hex });
            if (!exists) {
                await Color.create(color);
            }
        }

        console.log("Colores insertados.");
        process.exit();
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

populate();
