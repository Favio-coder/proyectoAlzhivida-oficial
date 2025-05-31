const UsuarioModel = require('./UsuarioModel')

class CuidadorProfesional extends UsuarioModel {
    AsignarAccion(usuarioEstrategia){
        console.log(`Profesional asigna acción con estrategia: ${usuarioEstrategia.nombre}`)
    }
}

module.exports = CuidadorProfesional