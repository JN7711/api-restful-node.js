const jwt = require('jsonwebtoken');
const config = require('../config/config');

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Asumiendo que el token se envía en el encabezado Authorization como "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
    }

    try {
        const verified = jwt.verify(token, config.JWT_SECRET); // Asegúrate de definir JWT_SECRET en tu archivo .env
        req.user = verified; // Puedes almacenar la información del usuario en req.user
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token no válido.' });
    }
};

module.exports = auth;

