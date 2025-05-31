const CuidadorProfesional = require('./Usuarios/CuidadorProfesional')
const Administrador = require('./Usuarios/UsuarioModel')
const CuidadorNoProfesional = require('./Usuarios/CuidadorNoProfesional')

class UsuarioFactory {
  static crearUsuario(tipo, datos) {
    switch (tipo) {
      case 'Cuidador profesional':
        return new CuidadorProfesional(datos);
      case 'Cuidador no profesional':
        return new CuidadorNoProfesional(datos);
      case 'Administrador':
        return new Administrador(datos);
      default:
        throw new Error('Tipo de usuario no válido!!');
    }
  }
}

module.exports = UsuarioFactory;
