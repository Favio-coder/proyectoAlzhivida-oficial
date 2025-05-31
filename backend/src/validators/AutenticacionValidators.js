const Joi = require('joi')

const esquemaRegistro = Joi.object({
    nombre: Joi.string().min(2).max(50).required(),
    apellido: Joi.string().min(2).max(50).required(),
    correo: Joi.string().email().required(),
    contrasena: Joi.string().min(8).required(),
    fechaNacimiento: Joi.date().required(),
    genero: Joi.string().min(2).max(15).required(),
    foto: Joi.string().required(),
    pais: Joi.string().required(),
})

const esquemaEditar = Joi.object({
    nombre: Joi.string().min(2).max(50).required(),
    apellido: Joi.string().min(2).max(50).required(),
    correo: Joi.string().email().required(),
    fechaNacimiento: Joi.date().required(),
    genero: Joi.string().min(2).max(15).required(),
    foto: Joi.string().required(),
    pais: Joi.string().required(),
})

const esquemaCambioContrasena = Joi.object({
    correo: Joi.string().email().required(),
    anteriorContrasena: Joi.string().required(),
    nuevaContrasena: Joi.string().min(8).required()
});

const esquemaInicioSesion = Joi.object({
    correo: Joi.string().email().required(),
    contrasena: Joi.string().required()
});

const esquemaRecuperarContrasena = Joi.object({
    correo: Joi.string().email().required(),
    contrasena: Joi.string().min(8).required()
});

const esquemaEliminarCuenta = Joi.object({
    correo: Joi.string().email().required()
});

module.exports = {
    esquemaRegistro,
    esquemaEditar,
    esquemaCambioContrasena,
    esquemaInicioSesion,
    esquemaRecuperarContrasena,
    esquemaEliminarCuenta
};
