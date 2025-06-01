import apiAutenticacion from '../api/apiAutenticacion'   

export const verificarEmail = (email) => {
  return apiAutenticacion.post('/verificarCorreo',{ correo: email })
}

export const verificarCodigo = (email, codigo) => {
    return apiAutenticacion.post('/validarCodigo', {correo: email, codigo: codigo})
}

export const registrarCuidadorNoProfesional = (data) => {
  return apiAutenticacion.post('/registrarCuidadorNoProfesional', data)
}