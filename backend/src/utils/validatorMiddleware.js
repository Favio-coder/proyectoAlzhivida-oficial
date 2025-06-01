// src/utils/validatorMiddleware.js
const Joi = require('joi')

// Middleware que valida con el esquema dado
function validarEsquema(esquema) {
    return (req, res, next) => {
        const { error } = esquema.validate(req.body)
        if (error) {
            return res.status(422).json({
                success: false,
                mensaje: 'Datos inválidos',
                errores: error.details.map(detalle => detalle.message)
            })
        }
        next()
    }
}

module.exports = {validarEsquema};
