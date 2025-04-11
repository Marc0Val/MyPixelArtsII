const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "secretito_super_secreto_123"; // ← mejora esto en .env

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });
        if (!admin) return res.status(401).json({ message: "Credenciales inválidas" });

        const isValid = await bcrypt.compare(password, admin.password);
        if (!isValid) return res.status(401).json({ message: "Credenciales inválidas" });

        const token = jwt.sign({ id: admin._id, username: admin.username }, SECRET, { expiresIn: "12h" });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: "Error en el login", error: err });
    }
};
