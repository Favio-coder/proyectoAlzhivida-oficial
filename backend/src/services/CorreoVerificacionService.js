const { enviarCodigoPorCorreo } = require('../utils/emailsender')
const { enviarCodigoPorCorreoContrasena} = require('../utils/emailsender')


//Repositorio 
const AutenticacionRepositorio = require('../repo/AutenticacionRepositorio')

const codigosVerificacion = {};
const TIEMPO_EXPIRACION_MS = 180 * 1000; // 180 segundos

const CorreoVerificacionService = {
  enviarCodigo: async (correo) => {
    
    await AutenticacionRepositorio.verificarCorreoExistente(correo)
    
    const actual = Date.now();

    // Verificar si ya hay un código y aún no ha expirado
    const registro = codigosVerificacion[correo];
    if (registro && actual - registro.timestamp < TIEMPO_EXPIRACION_MS) {
      return { mensaje: 'Ya se ha enviado un código recientemente' };
    }

    // Generar un código aleatorio de 6 dígitos
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();

    // Guardar código con timestamp
    codigosVerificacion[correo] = {
      codigo,
      timestamp: actual
    };

    // Enviar el código por correo
    await enviarCodigoPorCorreo(correo, codigo);

    return { mensaje: `Código enviado con exito a ${correo} y el código es ${codigo}`};
  },

  obtenerCodigo:  (correo) => {
    const registro = codigosVerificacion[correo];
    if (!registro) return null;

    // Verificar si el código ha expirado
    const actual = Date.now();
    if (actual - registro.timestamp > TIEMPO_EXPIRACION_MS) {
      delete codigosVerificacion[correo]; // limpiar expirado
      return null;
    }

    return registro.codigo;
  },
  verificarCodigo: async (correo, codigoIngresado) => {
      const registro = codigosVerificacion[correo];

      if (!registro) {
          return {
              valido: false, 
              mensaje: 'No se ha enviado ningún código a este correo'
          };
      }

      const actual = Date.now(); // <- Corregido aquí
      if (actual - registro.timestamp > TIEMPO_EXPIRACION_MS) {
          delete codigosVerificacion[correo];
          return {
              valido: false, 
              mensaje: 'El código ya ha expirado'
          };
      }

      if (registro.codigo !== codigoIngresado) {
          return {
              valido: false, 
              mensaje: 'El código insertado no es correcto'
          };
      }

      delete codigosVerificacion[correo];

      await AutenticacionRepositorio.guardarCorreoVerificado(correo)

      return { valido: true, mensaje: 'Código verificado correctamente' };
  },
  enviarCodigoContrasena: async (correo) => {
    
    const actual = Date.now();

    // Verificar si ya hay un código y aún no ha expirado
    const registro = codigosVerificacion[correo];
    if (registro && actual - registro.timestamp < TIEMPO_EXPIRACION_MS) {
      return { mensaje: 'Ya se ha enviado un código recientemente' };
    }

    // Generar un código aleatorio de 6 dígitos
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();

    // Guardar código con timestamp
    codigosVerificacion[correo] = {
      codigo,
      timestamp: actual
    };

    // Enviar el código por correo
    await enviarCodigoPorCorreoContrasena(correo, codigo);

    return { mensaje: `Código enviado con exito a ${correo} y el código es ${codigo}`};
  },
  verificarCodigoContrasena: async (correo, codigoIngresado) => {
      const registro = codigosVerificacion[correo];

      if (!registro) {
          return {
              valido: false, 
              mensaje: 'No se ha enviado ningún código a este correo'
          };
      }

      const actual = Date.now(); // <- Corregido aquí
      if (actual - registro.timestamp > TIEMPO_EXPIRACION_MS) {
          delete codigosVerificacion[correo];
          return {
              valido: false, 
              mensaje: 'El código ya ha expirado'
          };
      }

      if (registro.codigo !== codigoIngresado) {
          return {
              valido: false, 
              mensaje: 'El código insertado no es correcto'
          };
      }

      delete codigosVerificacion[correo];

      // Cambiar contraseña en repositorio
      // await AutenticacionRepositorio.recuperarContrasenaOlvidada()
      // await AutenticacionRepositorio.guardarCorreoVerificado(correo)

      return { valido: true, mensaje: 'Código verificado correctamente' };
  },

  
};

module.exports = CorreoVerificacionService;
