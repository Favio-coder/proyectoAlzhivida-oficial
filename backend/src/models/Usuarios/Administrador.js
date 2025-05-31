const UserioModel = require('./UsuarioModel')

class Administrador extends UsuarioModel {
  AsignarAccion(usuarioEstrategia) {
    console.log(`Administrador asigna acción con estrategia: ${usuarioEstrategia.nombre}`);
  }
}

module.exports = Administrador