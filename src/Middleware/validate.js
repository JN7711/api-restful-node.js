const { body, validationResult } = require('express-validator');

const validateTodo = [
    body('title')
        .notEmpty()
        .withMessage('El título es obligatorio.')
        .isString()
        .withMessage('El título debe ser una cadena de texto.'),
    body('completed')
        .optional()
        .isBoolean()
        .withMessage('El estado completado debe ser un booleano.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = {
    validateTodo,
};
