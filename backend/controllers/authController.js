const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });
        if (!admin) return res.status(401).json({ message: "Credenciales inválidas" });

        const isValid = await bcrypt.compare(password, admin.password);
        if (!isValid) return res.status(401).json({ message: "Credenciales inválidas" });


        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
            expiresIn: "1h", // 1 hora
        });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: "Error en el login", error: err });
    }
};

// exports.logout = (req, res) => {
//     res.status(200).json({ message: "Sesión cerrada. Elimina tu token del cliente." });
// };

