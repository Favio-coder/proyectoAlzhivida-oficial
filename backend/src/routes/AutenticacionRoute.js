const express  = require("express");
const router = express.Router()
const authMiddleware = require('../utils/authMiddleware')


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
router.post('/registrarCuidadorNoProfesional',  AutenticacionController.crearUsuario)

// Ruta para editar datos 
router.post('/editarCuidadorNoProfesional',authMiddleware, AutenticacionController.editarUsuario)
// Ruta para cambiar contraseña
router.post('/cambiarContrasena', authMiddleware, AutenticacionController.cambiarContrasena)

// Ruta para eliminar cuenta 
router.post('/eliminarCuenta', authMiddleware, AutenticacionController.eliminarCuenta)

// Ruta para recuperar contraseña 
router.post('/verificarCorreoContrasena', CorreoVerificacionController.enviarCodigoContrasena)
router.post('/validarCodigoContrasena', CorreoVerificacionController.validarCodigoContrasena)
router.post('/recuperarContrasena', AutenticacionController.recuperarContrasenaOlvidada)

// Ruta para iniciar sesión 
router.post('/iniciarSesion', AutenticacionController.iniciarSesion)

//Ruta para el verificar correo
router.post('/verificarCorreo', CorreoVerificacionController.enviarCodigo)
router.post('/validarCodigo', CorreoVerificacionController.validarCodigo)

module.exports = router
