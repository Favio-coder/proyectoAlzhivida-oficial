//Capa repositorio
const AutenticacionRepositorio = require('../repo/AutenticacionRepositorio')

const CorreoVerificacionService = require('../services/CorreoVerificacionService')

//Funciones de utils.ks
const {hashContrasenia} = require('../utils/hash')
const bcrypt = require('bcrypt')

//Validators
const {esquemaRegistro, esquemaEditar, esquemaCambioContrasena, esquemaEliminarCuenta , esquemaInicioSesion, esquemaRecuperarContrasena} = require('../validators/AutenticacionValidators')

const AutenticacionService = {
    async buscarUsuario(idUsuario) {
        const usuario = await AutenticacionRepositorio.buscarPorId(idUsuario)

        if(!usuario){
            throw new Error('Usuario no encontrado')
        }

        return usuario
    },

    listUsuarios: async () => {
        const usuarios = await AutenticacionRepositorio.listUsuarios()        
        return usuarios
    },

    registrarCuidadorNoProfesional: async (dataUsuario) => {
        try{
            const {error} = esquemaRegistro.validate(dataUsuario)
            if (error) throw new Error(error.details[0].message);

            //Hashear contraseñas 
            const contraseniaHasheada = await hashContrasenia(dataUsuario.contrasena)

            const usuarioSeguro = {
                ...dataUsuario,
                contrasena: contraseniaHasheada
            }

            //Llamar a la capa repositorio para crear el usuario 
            const result = await AutenticacionRepositorio.crearCuentaNoProfesional(usuarioSeguro)

            return result
        }catch(err){
            console.error("Fallo en la creación de Usuario", err.message)
            throw err
        }
    },

    editarCuidadorNoProfesional: async (dataUsuario) => {
        try{
            const {error} = esquemaEditar.validate(dataUsuario)
            if (error) throw new Error(error.details[0].message);

            //Llamar a la capa repositorio para editar el usuario 
            const result = await AutenticacionRepositorio.editarCuentaNoProfesional(dataUsuario)

            return result
        }catch(err){
            console.error("Fallo en la edición de Usuario", err.message)
            throw err
        }

    },

    cambiarContrasena: async (dataUsuario) => {
        try{
            const {error} = esquemaCambioContrasena.validate(dataUsuario)
            if (error) throw new Error(error.details[0].message); 

            if(dataUsuario.anteriorContrasena === dataUsuario.nuevaContrasena){
                throw new Error('No puedes cambiar a la misma contraseña, debe ser otra')
            }
            
            //Recuperar la contraseña anterior 
            const hashGuardado = await AutenticacionRepositorio.recuperarContrasena(dataUsuario)

            const coincidencia = await bcrypt.compare(dataUsuario.anteriorContrasena, hashGuardado.contrasena)
            

            if(!coincidencia){
                throw new Error('La contraseña anterior no coincide')
            }

            const hashNuevo = await hashContrasenia(dataUsuario.nuevaContrasena)

            const dataUsuarioEnviar = {
                ...dataUsuario,
                nuevaContrasena: hashNuevo
            }



            // Llamar al repositorio 
            const resultado = await AutenticacionRepositorio.cambiarContrasena(dataUsuarioEnviar)
            return resultado
        }catch(err){
            console.error('Existe un error: ', err)
            throw err
        }
    }, 

    recuperarCredenciales: async (dataUsuario) => {
        try{
            const {error} = esquemaInicioSesion.validate(dataUsuario)
            if (error) throw new Error(error.details[0].message);


            const recuperado = await AutenticacionRepositorio.recuperarCredenciales(dataUsuario)

            if (
                !recuperado.credenciales ||
                typeof recuperado.credenciales !== 'object' ||
                !recuperado.credenciales.l_emailUsua ||
                !recuperado.credenciales.l_contraUsua
            ) {
                throw new Error('El correo electrónico no es correcto o no existe');
            }


            const credenciales = {
                l_emailUsua: recuperado.credenciales.l_emailUsua,
                l_contraUsua: recuperado.credenciales.l_contraUsua
            }


            //Comparar datos 
            const coincidenciaContra = await bcrypt.compare(dataUsuario.contrasena, credenciales.l_contraUsua)

            if(!coincidenciaContra){
                throw new Error('La contraseña no es la correcta')
            }

            //Recuperar usuario 
            const usuarioRecuperado = await AutenticacionRepositorio.recuperarUsuario(dataUsuario)
            return usuarioRecuperado
        }catch(err){
            console.error("Existe un error: ", err)
            throw err
        }

    },

    recuperarContrasenaOlvidada: async (dataUsuario) => {
        try{
            //Validación 
            const {error} = esquemaRecuperarContrasena.validate(dataUsuario)
            if (error) throw new Error(error.details[0].message);

            //Hashear nueva contraseña 
            const contrasenaHasehada = await hashContrasenia(dataUsuario.contrasena)

            const dataUsuarioEnviar = {
                ...dataUsuario,
                contrasena: contrasenaHasehada
            }

            //Llamar a la capa repositorio para cambiar la contraseña
            const contrasenaNueva= await AutenticacionRepositorio.recuperarContrasenaOlvidada(dataUsuarioEnviar)

            return 'Se cambio la contraseña exitosamente'
        }catch(err){
            console.error("Fallo en la recuperación de contraseña", err.message)
            throw err
        }
    },

    eliminarCuenta: async (dataUsuario) => {
        try{
            //validación
            const {error} = esquemaEliminarCuenta.validate(dataUsuario)
            if (error) throw new Error(error.details[0].message);

            //
            const cuentaEliminada = await AutenticacionRepositorio.eliminarCuenta(dataUsuario)

            return 'Cuenta eliminada'
        }catch(err){
            console.error("Fallo en la eliminación de cuenta", err.message)
            throw err
        }
    }

}

module.exports = AutenticacionService