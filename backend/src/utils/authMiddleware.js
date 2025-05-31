const jwt = require('jsonwebtoken')
require('dotenv').config()

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ success: false, mensaje: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // pon tu clave secreta en variables de entorno
        req.usuario = decoded; // puedes acceder al usuario decodificado en los controladores
        next();
    } catch (err) {
        return res.status(403).json({ success: false, mensaje: 'Token inválido o expirado' });
    }
};

module.exports = authMiddleware