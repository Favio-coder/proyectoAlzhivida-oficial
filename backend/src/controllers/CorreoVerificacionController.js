const CorreoVerificacionService = require('../services/CorreoVerificacionService')

const CorreoVerificacionController = {
    enviarCodigo: async (req, res) => {
        try{
            const {correo} = req.body
            if(!correo) return res.status(400).json({ error: 'Correo es obligatorio'});

            const respuesta = await CorreoVerificacionService.enviarCodigo(correo)
            res.json(respuesta)
        }catch(err){
            // console.error("Error al enviar el código: ", err)
            // res.status(500).json({error: 'Error al enviar el código de verificación'})

            res.status(400).json({
                mensaje: err.message || "Error al enviar el código.",
                success: false,
                valido: false
            });
        }
    }, 
    enviarCodigoContrasena: async (req, res) => {
        try{
            const {correo} = req.body
            if(!correo) return res.status(400).json({ error: 'Correo es obligatorio'});

            const respuesta = await CorreoVerificacionService.enviarCodigoContrasena(correo)
            res.json(respuesta)
        }catch(err){
            // console.error("Error al enviar el código: ", err)
            // res.status(500).json({error: 'Error al enviar el código de verificación'})

            res.status(400).json({
                mensaje: err.message || "Error al enviar el código.",
                success: false,
                valido: false
            });
        }
    }, 
    validarCodigo: async (req, res) => {
        const { correo, codigo } = req.body;

        try {
            const resultado = await CorreoVerificacionService.verificarCodigo(correo, codigo);
            res.status(200).json(resultado); // Respuesta en caso de éxito
        } catch (error) {
            console.error("Error al verificar código:", error.message);

            // Enviar respuesta JSON clara al frontend
            res.status(400).json({
                mensaje: error.message || "Error al verificar el código.",
                success: false,
                valido: false
            });
        }
    },
    validarCodigoContrasena: async (req, res) => {
        const { correo, codigo } = req.body;

        try {
            const resultado = await CorreoVerificacionService.verificarCodigoContrasena(correo,codigo)
            res.status(200).json(resultado) // Respuesta en caso de éxito
        } catch (error) {
            console.error("Error al verificar código:", error.message);

            // Enviar respuesta JSON clara al frontend
            res.status(400).json({
                mensaje: error.message || "Error al verificar el código.",
                success: false,
                valido: false
            });
        }
    },
    
}

module.exports = CorreoVerificacionController