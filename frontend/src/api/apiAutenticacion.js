import axios from 'axios'
import Swal from 'sweetalert2'

const apiAutenticacion = axios.create({
    baseURL: 'http://localhost:3001/api/autenticacion',
    headers: {
        'Content-Type': 'application/json',
    },
})

apiAutenticacion.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            const { status, data } = error.response

            if (status === 422 && Array.isArray(data.errores)) {
                const erroresTraducidos = data.errores.map(err => {
                    if (err.includes('"correo"')) return 'El correo es un campo obligatorio'
                    if (err.includes('"contrasena"')) return 'La contraseña es un campo obligatorio'
                    if(err.includes('"nombre"')) return 'Los nombres son campos obligatorios'
                    if(err.includes('"apellido"')) return 'Los apellidos son campos obligatorios'
                    if(err.includes('"genero"')) return 'El género es un campo obligatorio'
                    if(err.includes('"pais"')) return 'El país es un campo obligatorio'
                    if(err.includes('"fechaNacimiento"')) return 'La fecha de nacimiento es un campo obligatorio'
                    // Otros mensajes personalizados que tengas
                    return 'Rellena todo los campos'
                })

                // Mostrar SweetAlert con los errores traducidos
                Swal.fire({
                    icon: 'error',
                    title: 'Errores de validación',
                    html: erroresTraducidos.join('<br>'),
                    confirmButtonText: 'Aceptar'
                })

                // Actualiza los errores traducidos en la respuesta para quien los use
                error.response.data.errores = erroresTraducidos

                // Aquí se rechaza la promesa para que el flujo se detenga en el catch del lugar donde se llamó la API
                return Promise.reject(error)
            }

            // Puedes agregar más manejo de otros errores si quieres
        }

        // Para errores sin respuesta o no manejados, simplemente rechaza la promesa
        return Promise.reject(error)
    }
)

export default apiAutenticacion
