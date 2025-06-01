// SQL server
//const { getConnection } = require('../database/database')

// MySql 
const {getConnection} = require('../database/database2')

const UsuarioFactory = require('../models/UsuarioFactory')
const {calcularEdadDesdeFecha} = require('../utils/utils')
const { v4: uuidv4 } = require('uuid');


const AutenticacionRepositorio = {
    buscarPorId: async (_id) => {
        try {
            const pool = await getConnection();
            const result = await pool.request()
            .input('id', _id)
            .query(`SELECT u.c_usua, u.l_nomUsua, u.l_apellUsua, u.f_nacimiento, 
                            u.l_emailUsua, u.l_genUsua, r.l_rol 
                    FROM Usuario AS u 
                    INNER JOIN Rol AS r ON u.c_rol = r.c_rol 
                    WHERE u.c_usua = @id`);

            if (result.recordset.length === 0) return null;

            const usuarioDB = result.recordset[0];
            return UsuarioFactory.crearUsuario(usuarioDB.l_rol, usuarioDB);
        } catch (err) {
            throw err;
        }
    },
    listUsuarios: async () => {
        try {
            const pool = await getConnection();
            const resultUsuarios = await pool.request().query(`
                SELECT u.*, r.l_rol 
                FROM Usuario AS u 
                INNER JOIN Rol AS r ON u.c_rol = r.c_rol
            `)

            // const resultRoles = await pool.request().query(`
            //     select * from Rol    
            // `)

            // console.log("Los roles son: ", resultRoles)

            const usuarios = resultUsuarios.recordset.map(usuarioDB => {

                
            const usuarioMapeado = {
                nomUsuario: usuarioDB.l_nomUsua ?? '',
                apelUsuario: usuarioDB.l_apellUsua ?? '',
                edadUsuario: usuarioDB.f_nacimiento ? calcularEdadDesdeFecha(usuarioDB.f_nacimiento) : "",
                emailUsuaio: usuarioDB.l_emailUsua ?? '',
                genUsuario: usuarioDB.l_genUsua ?? '',
                paisUsuario: usuarioDB.l_paisUsua ?? '',  
                contraUsuario: usuarioDB.l_contraUsua ?? '',  
                fotoUsuario: usuarioDB.l_fotUsua ?? '', 
            };

            return UsuarioFactory.crearUsuario(usuarioDB.l_rol, usuarioMapeado);

            });

            
            return usuarios;
        } catch (err) {
            throw err;
        }
    },

    // Crear cuenta 
    /**Este apartado debe tener un endpoint mediante una petición post para crear almacenar una instancia de objeto en la tabla Usuarios */

    // Crear cuenta para Cuidador no profesional 
    // crearCuidadorNoProfesional: async (_dataUsuario) => {
    //     try {
    //         //Aplicar Singleton como patrón de diseño 
    //         const pool = await getConnection()

    //         //Aplicar una query para buscar roles 
    //         const rolUsuario = await pool.request().query(`
    //             select c_rol from Rol where l_rol='Cuidador no profesional'  
    //         `)

    //         if (rolUsuario.recordset.length === 0) {
    //             throw new Error("Rol 'Cuidador no profesional' no encontrado");
    //         }

    //         const cRol = rolUsuario.recordset[0].c_rol.trim()

    //         // Mejorar con un procedimiento almacenado 
    //         const cuidadorNoProfesional = await pool.request()
    //             .input('rol', cRol)
    //             .input('nombre', _dataUsuario.nombre)
    //             .input('apellido', _dataUsuario.apellido)
    //             .input('fechaNacimiento', _dataUsuario.fechaNacimiento)
    //             .input('email', _dataUsuario.email)
    //             .input('genero', _dataUsuario.genero)
    //             .input('foto', _dataUsuario.foto)
    //             .input('pais', _dataUsuario.pais)
    //             .input('contrasena', _dataUsuario.contrasena)
    //             .query(`
    //                 INSERT INTO Usuario (
    //                     c_usua,
    //                     c_rol,
    //                     l_nomUsua,
    //                     l_apellUsua,
    //                     f_nacimiento,
    //                     l_emailUsua,
    //                     l_genUsua,
    //                     l_fotUsua,
    //                     l_paisUsua,
    //                     l_contraUsua,
    //                     f_creacion
    //                 )
    //                 VALUES (
    //                     NEWID(),
    //                     @rol,
    //                     @nombre,
    //                     @apellido,
    //                     @fechaNacimiento,
    //                     @email,
    //                     @genero,
    //                     @foto,
    //                     @pais,
    //                     @contrasena,
    //                     GETDATE()
    //                 )
    //             `)


    //             // Crear objeto después 

    //         return { 
    //             usuario: cuidadorNoProfesional,
    //             mensaje: 'Usuario creado exitósamente',
    //             success: true 
    //         };
    //     } catch (error) {
    //         console.error('Error al crear usuario:', error);
    //         throw error;
    //     }
    // },

    /**Flujo real de la creación de cuentas */
    //Guardar correo en la base de datos 
    guardarCorreoVerificado: async (correo) => {
        try {
            const pool = await getConnection();

            // Verificar si ya existe un usuario con ese correo
            const [usuarioExistente] = await pool.execute(
                    `SELECT 1 FROM Usuario WHERE l_emailUsua = ?`,
                    [correo]
                )

            if (usuarioExistente.length > 0) {
                throw new Error("Ya existe un usuario con ese correo electrónico.");
            }

            // Obtener el rol "Cuidador no profesional"
            const [rolUsuario] = await pool.execute(
                    `SELECT c_rol FROM Rol WHERE l_rol = ?`,
                    ['Cuidador no profesional']
                );

            if (rolUsuario.length === 0) {
                throw new Error("Rol 'Cuidador no profesional' no encontrado.");
            }

            const cRol = rolUsuario[0].c_rol.trim();

            //Generamos nuevo ID
            const nuevoId = uuidv4().toUpperCase()

            // Insertar nuevo usuario
            const [cuentaVerificada] = await pool.execute(
                    `INSERT INTO Usuario (c_usua, c_rol, l_emailUsua) VALUES (?, ?, ?)`,
                    [nuevoId, cRol, correo]
            );

            return {
                mensaje: "Cuenta verificada",
                success: true,
                valido: true
            }
        } catch (error) {
            console.error('Error al verificar usuario: ', error.message);
            throw error;
        }
    },

    verificarCorreoExistente: async (correo) => {
        try {
            const pool = await getConnection();

            // Ejecutar la consulta
            const [rows] = await pool.execute(
                `SELECT 1 FROM Usuario WHERE l_emailUsua = ?`,
                [correo]
            );


            // Verificar si ya existe
            if (rows.length > 0) {
                throw new Error("Ya existe un usuario con ese correo electrónico.");
            }

            return {
                mensaje: "Correo electrónico nuevo",
                success: true,
                valido: true
            };

        } catch (err) {
            console.error("Error al verificar correo existente:", err.message);
            throw err;
        }
    },


    crearCuentaNoProfesional: async (_dataUsuario) => {
        try {
            const pool = await getConnection();

            const [resultado] = await pool.execute(`
                UPDATE Usuario
                SET 
                    l_nomUsua = ?,
                    l_apellUsua = ?,
                    f_nacimiento = ?,
                    l_genUsua = ?,           
                    l_fotUsua = ?,
                    l_paisUsua = ?,
                    l_contraUsua = ?,
                    f_creacion = NOW()
                WHERE l_emailUsua = ?
            `, [
                _dataUsuario.nombre,
                _dataUsuario.apellido,
                _dataUsuario.fechaNacimiento,
                _dataUsuario.genero,
                _dataUsuario.foto,
                _dataUsuario.pais,
                _dataUsuario.contrasena,
                _dataUsuario.correo
            ]);

            return {
                usuario: resultado,
                mensaje: 'Usuario creado exitosamente',
                success: true
            };

        } catch (err) {
            console.error('No se logró crear el usuario: ', err);
            throw err;
        }
    },
    editarCuentaNoProfesional: async (_dataUsuario) => {
        try {
            const pool = await getConnection();

            const [resultado] = await pool.execute(`
                UPDATE Usuario
                SET 
                    l_nomUsua = ?,
                    l_apellUsua = ?,
                    f_nacimiento = ?,
                    l_genUsua = ?,           
                    l_fotUsua = ?,
                    l_paisUsua = ?
                WHERE l_emailUsua = ?
            `, [
                _dataUsuario.nombre,
                _dataUsuario.apellido,
                _dataUsuario.fechaNacimiento,
                _dataUsuario.genero,
                _dataUsuario.foto,
                _dataUsuario.pais,
                _dataUsuario.correo
            ]);

            return {
                usuario: resultado,
                mensaje: 'Usuario editado exitosamente',
                success: true
            };

        } catch (err) {
            console.error('No se logró editar el usuario: ', err);
            throw err;
        }
    },
    cambiarContrasena: async (_dataUsuario) => {
        try {
            const pool = await getConnection();

            const [resultado] = await pool.execute(`
                UPDATE Usuario
                SET l_contraUsua = ?
                WHERE l_emailUsua = ?
            `, [
                _dataUsuario.nuevaContrasena,
                _dataUsuario.correo
            ]);

            return {
                mensaje: 'La contraseña fue editada exitosamente',
                success: true
            };

        } catch (err) {
            console.error('Error al cambiar la contraseña:', err);
            throw err;
        }
    },

    recuperarContrasena: async (_dataUsuario) => {
        try {
            const pool = await getConnection();

            const [rows] = await pool.execute(`
                SELECT l_contraUsua FROM Usuario WHERE l_emailUsua = ?
            `, [_dataUsuario.correo]);

            return {
                contrasena: rows.length > 0 ? rows[0].l_contraUsua : null
            };

        } catch (err) {
            console.error('Error al recuperar la contraseña:', err);
            throw err;
        }
    },
    /**Flujo real del login de cuentas */
    recuperarCredenciales: async (_dataUsuario) => {
        try {
            const pool = await getConnection();

            const [rows] = await pool.execute(
                `SELECT l_emailUsua, l_contraUsua FROM Usuario WHERE l_emailUsua = ?`,
                [_dataUsuario.correo]
            );

            return {
                credenciales: rows.length > 0 ? rows[0] : null
            };
        } catch (err) {
            console.error("Error en recuperar Credenciales:", err);
            throw err;
        }
    },

    recuperarUsuario: async (_dataUsuario) => {
        try {
            const pool = await getConnection();

            const [rows] = await pool.execute(
                `SELECT u.c_usua, u.l_nomUsua, u.l_apellUsua, r.l_rol, u.f_nacimiento, 
                        u.l_emailUsua, u.l_genUsua, u.l_paisUsua, u.l_fotUsua,
                        u.q_membresia, u.n_ticket
                FROM Usuario AS u
                INNER JOIN Rol AS r ON u.c_rol = r.c_rol
                WHERE u.l_emailUsua = ?`,
                [_dataUsuario.correo]
            );

            return rows.length > 0 ? rows[0] : null;
        } catch (err) {
            console.error('Error al recuperar usuario:', err);
            throw err;
        }
    },

    recuperarContrasenaOlvidada: async (_dataUsuario) => {
        try {
            const pool = await getConnection();

            const [result] = await pool.execute(
                `UPDATE Usuario
                SET l_contraUsua = ?
                WHERE l_emailUsua = ?`,
                [_dataUsuario.contrasena, _dataUsuario.correo]
            );

            return 'Se cambió la contraseña con éxito';
        } catch (err) {
            console.error("No se logró cambiar la contraseña:", err);
            throw err;
        }
    },

    //Eliminar cuenta 
    eliminarCuenta: async (_dataUsuario) => {
        try {
            const pool = await getConnection();

            const [result] = await pool.execute(
                `DELETE FROM Usuario WHERE l_emailUsua = ?`,
                [_dataUsuario.correo]
            );

            return {
                mensaje: 'Cuenta eliminada exitosamente',
                success: true
            };
        } catch (err) {
            console.error("No se logró eliminar la cuenta:", err);
            throw err;
        }
    }

    


};

module.exports = AutenticacionRepositorio;
