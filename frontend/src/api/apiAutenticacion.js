import axios from 'axios'
import Swal from 'sweetalert2'

// Estado loading global (callback que será asignado desde React)
let setLoadingGlobal;

export const setGlobalLoadingHandler = (handler) => {
  setLoadingGlobal = handler;
}

// Desarrollo
const apiAutenticacion = axios.create({
  baseURL: 'http://localhost:3001/api/autenticacion',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Despligue en misma red
// const apiAutenticacion = axios.create({
//   baseURL: 'http://0.0.0.0:3001/api/autenticacion',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

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

    if (status == 422 && Array.isArray(data.errores)) {
      const erroresTraducidos = data.errores.map(err => {
        if (err.includes('"correo"')) {
          if (err.includes('valid')) return 'El correo debe ser una dirección válida';
          return 'El correo es un campo obligatorio';
        }
        if (err.includes('"contrasena"')) return 'La contraseña es un campo obligatorio';
        if (err.includes('"nombre"')) return 'Los nombres son campos obligatorios';
        if (err.includes('"apellido"')) return 'Los apellidos son campos obligatorios';
        if (err.includes('"genero"')) return 'El género es un campo obligatorio';
        if (err.includes('"pais"')) return 'El país es un campo obligatorio';
        if (err.includes('"fechaNacimiento"')) return 'La fecha de nacimiento es un campo obligatorio';

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

    if (status === 401) {
      Swal.fire({
        icon: 'error',
        title: 'Inicio de sesión fallido',
        text: 'Contraseña incorrecta',
        confirmButtonText: 'Intentar de nuevo'
      });

      return Promise.reject(error);
    }

    // Otros errores (como 500 u otros)

    if (status === 500) {
      Swal.fire({
        icon: 'error',
        title: 'Error inesperado',
        text: data.mensaje || 'Ocurrió un error en el servidor',
        confirmButtonText: 'Aceptar'
      });

      return Promise.reject(error);
    }

    //Errores desconocidos 
    if (errorCode === 'ERR_NETWORK' || mensaje.includes('blocked') || mensaje.includes('NetworkError')) {
      Swal.fire({
        icon: 'error',
        title: 'Error de red o CORS',
        text: 'No se pudo conectar con el servidor. Verifica tu red o los permisos del navegador.',
        confirmButtonText: 'Revisar'
      });
    }

  }

  return Promise.reject(error);
});

export default apiAutenticacion;
