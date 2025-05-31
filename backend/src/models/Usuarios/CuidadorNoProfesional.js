const UsuarioModel = require('./UsuarioModel')

class CuidadorNoProfesional extends UsuarioModel{
    AsignarAccion(usuarioEstrategia){
        console.log(`No profesional asigna acción con estrategia: ${usuarioEstrategia.nombre}`)
    }
}

module.exports = CuidadorNoProfesional