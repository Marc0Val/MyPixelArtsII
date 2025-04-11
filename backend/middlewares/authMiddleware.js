const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "secretito_super_secreto_123"; // ← mejora esto en .env

module.exports = function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No autorizado" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET);
        req.admin = decoded; // info del admin disponible en req
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token inválido" });
    }
};
