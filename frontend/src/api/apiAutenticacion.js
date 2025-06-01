import axios from 'axios'
import Swal from 'sweetalert2'

// Estado loading global (callback que será asignado desde React)
let setLoadingGlobal;

export const setGlobalLoadingHandler = (handler) => {
  setLoadingGlobal = handler;
}

const apiAutenticacion = axios.create({
  baseURL: 'http://localhost:3001/api/autenticacion',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para activar loading en cada request
apiAutenticacion.interceptors.request.use(config => {
  if (setLoadingGlobal) setLoadingGlobal(true);
  return config;
}, error => {
  if (setLoadingGlobal) setLoadingGlobal(false);
  return Promise.reject(error);
});

// Interceptor para desactivar loading en cada respuesta o error
apiAutenticacion.interceptors.response.use(response => {
  if (setLoadingGlobal) setLoadingGlobal(false);
  return response;
}, error => {
  if (setLoadingGlobal) setLoadingGlobal(false);

  if (error.response) {
    const { status, data } = error.response;

    if (status === 422 && Array.isArray(data.errores)) {
      const erroresTraducidos = data.errores.map(err => {
        if (err.includes('"correo"')) return 'El correo es un campo obligatorio';
        if (err.includes('"contrasena"')) return 'La contraseña es un campo obligatorio';
        if (err.includes('"nombre"')) return 'Los nombres son campos obligatorios';
        if (err.includes('"apellido"')) return 'Los apellidos son campos obligatorios';
        if (err.includes('"genero"')) return 'El género es un campo obligatorio';
        if (err.includes('"pais"')) return 'El país es un campo obligatorio';
        if (err.includes('"fechaNacimiento"')) return 'La fecha de nacimiento es un campo obligatorio';
        // Otros mensajes personalizados que tengas
        return 'Rellena todos los campos';
      });

      Swal.fire({
        icon: 'error',
        title: 'Errores de validación',
        html: erroresTraducidos.join('<br>'),
        confirmButtonText: 'Aceptar'
      });

      // Actualiza los errores traducidos para quien use la API
      error.response.data.errores = erroresTraducidos;

      return Promise.reject(error);
    }

    // Otros posibles manejos de error
  }

  return Promise.reject(error);
});

export default apiAutenticacion;
