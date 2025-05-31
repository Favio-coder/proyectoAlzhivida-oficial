const enviarCodigoPorCorreo = require('../services/AutenticacionService')

exports.handleRegistration = async (email) => {
  const codigo = Math.floor(100000 + Math.random() * 900000).toString(); // Código de 6 dígitos

  // Opción 1: Guarda el código temporalmente (por ahora en memoria)
  // Opción 2 (opcional): Puedes guardar en base de datos si ya tienes modelo de usuario

  // Enviar correo
  await enviarCodigoPorCorreo(email, codigo);

  // OJO: debes guardar el código para verificarlo luego (en una base de datos o en memoria por ahora)
  // Por ahora puedes usar una variable global o en memoria temporal para pruebas.
}