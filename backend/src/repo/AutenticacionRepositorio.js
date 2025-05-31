const { getConnection } = require('../database/database')
const UsuarioFactory = require('../models/UsuarioFactory')
const {calcularEdadDesdeFecha} = require('../utils/utils')

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
            const usuarioExistente = await pool.request()
                .input('correo', correo)
                .query(`
                    SELECT 1 FROM Usuario WHERE l_emailUsua = @correo
                `);

            if (usuarioExistente.recordset.length > 0) {
                throw new Error("Ya existe un usuario con ese correo electrónico.");
            }

            // Obtener el rol "Cuidador no profesional"
            const rolUsuario = await pool.request().query(`
                SELECT c_rol FROM Rol WHERE l_rol = 'Cuidador no profesional'
            `);

            if (rolUsuario.recordset.length === 0) {
                throw new Error("Rol 'Cuidador no profesional' no encontrado.");
            }

            const cRol = rolUsuario.recordset[0].c_rol.trim();

            // Insertar nuevo usuario
            const cuentaVerificada = await pool.request()
                .input('correo', correo)
                .input('rol', cRol)
                .query(`
                    INSERT INTO Usuario (c_usua, c_rol, l_emailUsua)
                    VALUES (NEWID(), @rol, @correo)
                `);

            console.log("Esta es la cuenta verificada: ", cuentaVerificada.rowsAffected);

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
        try{
            const pool = await getConnection()

            // Verificar si ya existe un usuario con ese correo
            const usuarioExistente = await pool.request()
                .input('correo', correo)
                .query(`
                    SELECT 1 FROM Usuario WHERE l_emailUsua = @correo
            `);
            
            if (usuarioExistente.recordset.length > 0) {
                throw new Error("Ya existe un usuario con ese correo electrónico.");
            }

            return {
                mensaje: "Correo electrónico nuevo",
                success: true,
                valido: true
            };

        } catch(err){
            console.error("Error al verificar correo existente: ", err.message)
            throw err
        }
    },

    crearCuentaNoProfesional: async ( _dataUsuario) => {
        try{
            const pool = await getConnection()

            const usuarioCreado = await pool.request()
                .input('nombreUsuario', _dataUsuario.nombre)
                .input('apellidoUsuario', _dataUsuario.apellido)
                .input('fechaNacimiento', _dataUsuario.fechaNacimiento)
                .input('genero',  _dataUsuario.genero)
                .input('fotoUsuario', _dataUsuario.foto)
                .input('paisUsuario', _dataUsuario.pais)
                .input('contrasena', _dataUsuario.contrasena)
                .input('correo', _dataUsuario.correo)
                .query(`UPDATE Usuario
                    SET 
                        l_nomUsua = @nombreUsuario,
                        l_apellUsua = @apellidoUsuario,
                        f_nacimiento = @fechaNacimiento,
                        l_genUsua = @genero,           
                        l_fotUsua = @fotoUsuario,
                        l_paisUsua = @paisUsuario,
                        l_contraUsua = @contrasena,
                        f_creacion = GETDATE()
                    WHERE l_emailUsua = @correo
                `)
            
            return {
                usuario: usuarioCreado,
                mensaje: 'Usuario creado exitósamente',
                success: true 
            }   
        }catch(err){
            console.error('No se logro crear el usuario: ', err)
            throw err

        }
    },

    editarCuentaNoProfesional: async ( _dataUsuario) => {
        try{
            const pool = await getConnection()

            const usuarioCreado = await pool.request()
                .input('nombreUsuario', _dataUsuario.nombre)
                .input('apellidoUsuario', _dataUsuario.apellido)
                .input('fechaNacimiento', _dataUsuario.fechaNacimiento)
                .input('genero',  _dataUsuario.genero)
                .input('fotoUsuario', _dataUsuario.foto)
                .input('paisUsuario', _dataUsuario.pais)
                .input('correo', _dataUsuario.correo)
                .query(`UPDATE Usuario
                    SET 
                        l_nomUsua = @nombreUsuario,
                        l_apellUsua = @apellidoUsuario,
                        f_nacimiento = @fechaNacimiento,
                        l_genUsua = @genero,           
                        l_fotUsua = @fotoUsuario,
                        l_paisUsua = @paisUsuario
                    where l_emailUsua = @correo
                `)
            
            return {
                usuario: usuarioCreado,
                mensaje: 'Usuario editato exitósamente',
                success: true 
            }   
        }catch(err){
            console.error('No se logro editar el usuario: ', err)
            throw err

        }
    },

    cambiarContrasena: async(_dataUsuario) => {
        try{
            const pool = await getConnection()

            const modContrasenaUsuario = await pool.request()
                .input('correo', _dataUsuario.correo)
                .input('nuevaContrasena', _dataUsuario.nuevaContrasena)
                .query(`Update Usuario 
                    Set 
                        l_contraUsua = @nuevaContrasena
                    where
                        l_emailUsua = @correo
                `)


            return {
                mensaje: 'La contraseña fue editado exitósamente',
                success: true 
            }          

        }catch(err){
            console.error('Error al cambiar la contraseña')
            throw err
        }
    },

    recuperarContrasena: async(_dataUsuario) => {
        try{
            const pool = await getConnection()

            //Comparar contraseña 
            const antContrasena = await pool.request()
                    .input('correo', _dataUsuario.correo)
                    .query(`select l_contraUsua from Usuario where l_emailUsua = @correo`)
            
            return {
                contrasena: antContrasena
            }

        }catch(err){
            console.error('Error al recuperar la contraseña')
            throw err
        }
    },

    /**Flujo real del login de cuentas */
    recuperarCredenciales: async(_dataUsuario) => {
        try{
            const pool = await getConnection()

            const credenciales = await pool.request()
                .input('correo', _dataUsuario.correo)
                .query(`select l_emailUsua, l_contraUsua from Usuario where l_emailUsua= @correo`)
            
            return {
                credenciales: credenciales
            }
        }catch(err){
            console.error("Error en recuperar Credenciales:", err)
            throw err
        }
    },

    recuperarUsuario: async(_dataUsuario) => {
        try{
            const pool = await getConnection()

            const usuarioExistente = await pool.request()
                .input('correo', _dataUsuario.correo)
                .query(`
                    SELECT u.c_usua, u.l_nomUsua, u.l_apellUsua,r.l_rol, u.f_nacimiento, 
                    u.l_emailUsua, u.l_genUsua, u.l_paisUsua, u.l_fotUsua,
	                u.q_membresia, u.n_ticket
                    FROM Usuario AS u 
                    INNER JOIN Rol AS r ON u.c_rol = r.c_rol 
                    WHERE u.l_emailUsua = @correo
                `)
            
            return usuarioExistente
        }catch(err){
            console.error('Error al recuperar credenciales')
            throw err
        }
    },

    recuperarContrasenaOlvidada: async (_dataUsuario) => {
        try {
            const pool = await getConnection()

            const contrasenaOlvidada = await pool.request()
                .input('nuevaContrasena', _dataUsuario.contrasena)
                .input('correo', _dataUsuario.correo)
                .query(`
                    update Usuario 
                    set l_contraUsua = @nuevaContrasena
                    where l_emailUsua = @correo
                `)
            
            return 'Se cambio la contraseña con exito'
        }catch(err){
            console.error("No se logro cambiar la contraseña")
            throw err
        }
    },

    //Eliminar cuenta 
    eliminarCuenta: async(_dataUsuario) => {
        try{
            const pool = await getConnection()

            const eliminarCuenta = await pool.request()
                .input('@correo', _dataUsuario.correo)
                .query(`
                    delete from Usuario where l_emailUsua=@correo    
                `)
        }catch(err){
            console.error("No se logro eliminar la cuenta")
            throw err

        }
    }
    


};

module.exports = AutenticacionRepositorio;
