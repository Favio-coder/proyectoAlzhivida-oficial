const express  = require("express");
const router = express.Router()

// 
const authMiddleware = require('../utils/authMiddleware')
const {validarEsquema} = require('../utils/validatorMiddleware')
const {esquemaRegistro, esquemaEditar, esquemaCambioContrasena, esquemaEliminarCuenta , esquemaInicioSesion, esquemaRecuperarContrasena} = require('../validators/AutenticacionValidators')

//Importar servicios
const AutenticacionService = require('../services/AutenticacionService')


//Importar controllers
const CorreoVerificacionController = require('../controllers/CorreoVerificacionController')
const AutenticacionController = require('../controllers/AutenticacionController')



// Rutas pruebas
// router.post('/buscarId', AutenticacionService.buscarUsuario)
// router.get('/listUsuarios', async (req, res) => {
//     try {
//         const usuarios = await AutenticacionService.listUsuarios();
//         res.json(usuarios);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// })


// Rutas autenticación 
// Ruta para registrar un cuidador no profesional
router.post('/registrarCuidadorNoProfesional', validarEsquema(esquemaRegistro) ,AutenticacionController.crearUsuario)

// Ruta para editar datos 
router.post('/editarCuidadorNoProfesional',authMiddleware, validarEsquema(esquemaEditar) , AutenticacionController.editarUsuario)
// Ruta para cambiar contraseña
router.post('/cambiarContrasena', authMiddleware, validarEsquema(esquemaCambioContrasena) ,AutenticacionController.cambiarContrasena)

// Ruta para eliminar cuenta 
router.post('/eliminarCuenta', authMiddleware, validarEsquema(esquemaEliminarCuenta) ,AutenticacionController.eliminarCuenta)

// Ruta para recuperar contraseña 
router.post('/verificarCorreoContrasena', CorreoVerificacionController.enviarCodigoContrasena)
router.post('/validarCodigoContrasena', CorreoVerificacionController.validarCodigoContrasena)

router.post('/recuperarContrasena', validarEsquema(esquemaRecuperarContrasena), AutenticacionController.recuperarContrasenaOlvidada)

// Ruta para iniciar sesión 
router.post('/iniciarSesion', validarEsquema(esquemaInicioSesion) , AutenticacionController.iniciarSesion)

//Ruta para el verificar correo
router.post('/verificarCorreo', CorreoVerificacionController.enviarCodigo)
router.post('/validarCodigo', CorreoVerificacionController.validarCodigo)

module.exports = router
