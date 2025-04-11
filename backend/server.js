const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const pixelRoutes = require("./routes/pixelRouter"); // Rutas para los píxeles
const canvasRoutes = require("./routes/canvasRouter"); // Rutas para la configuración del lienzo
const colorRoutes = require("./routes/colorRoutes"); // Rutas para los colores

const authRoutes = require("./routes/authRoutes"); // Rutas para la autenticación del admin

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
// rutas creo xd
app.use("/api/pixels", pixelRoutes); // Rutas para los píxeles
app.use("/api/canvas", canvasRoutes); // Rutas para la configuración del lienzo
app.use("/api/colors", colorRoutes); // Rutas para los colores
app.use("/api/auth", authRoutes); // Rutas para la autenticación del admin


// Rutas base
app.get("/", (req, res) => {
    res.send("My Pixel Arts II - Backend operativo 🧠🎨");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor desplegado en el puerto ${PORT}`);
});
