const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');

jest.mock('../src/services/AutenticacionService');
const AutenticacionService = require('../src/services/AutenticacionService');

describe('AutenticacionController - Tests con mock y token', () => {
  let token;

  beforeAll(() => {
    // Payload de ejemplo para el token
    const payload = { id: 1, correo: 'usuario@example.com', rol: 'cuidador' };
    token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  });

  beforeEach(() => jest.clearAllMocks());

  // --- RUTAS SIN AUTH (no token requerido) ---

  describe('POST /iniciarSesion', () => {
    it('✅ responde 200 si el login es correcto', async () => {
      AutenticacionService.recuperarCredenciales.mockResolvedValue({
        c_usua: 1,
        l_emailUsua: 'usuario@example.com',
        c_rol: 'cuidador'
      });

      const res = await request(app).post('/iniciarSesion').send({
        correo: 'usuario@example.com',
        contrasena: '123456'
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.success).toBe(true);
    });

    it('❌ responde 500 si hay error interno', async () => {
      AutenticacionService.recuperarCredenciales.mockRejectedValue(new Error('Error de autenticación'));

      const res = await request(app).post('/iniciarSesion').send({
        correo: 'usuario@example.com',
        contrasena: 'mal'
      });

      expect(res.statusCode).toBe(500);
      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /registrarCuidadorNoProfesional', () => {
    it('✅ responde 201 si se crea el usuario correctamente', async () => {
      AutenticacionService.registrarCuidadorNoProfesional.mockResolvedValue({ mensaje: 'Usuario creado' });

      const res = await request(app).post('/registrarCuidadorNoProfesional').send({ nombre: 'Favio' });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
    });

    it('❌ responde 500 si hay error en el registro', async () => {
      AutenticacionService.registrarCuidadorNoProfesional.mockRejectedValue(new Error('Error al crear usuario'));

      const res = await request(app).post('/registrarCuidadorNoProfesional').send({ nombre: 'Favio' });

      expect(res.statusCode).toBe(500);
      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /recuperarContrasena', () => {
    it('✅ responde 200 si se recupera bien', async () => {
      AutenticacionService.recuperarContrasenaOlvidada.mockResolvedValue();

      const res = await request(app).post('/recuperarContrasena').send({ correo: 'favio@example.com' });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('❌ responde 500 si falla la recuperación', async () => {
      AutenticacionService.recuperarContrasenaOlvidada.mockRejectedValue(new Error('Error al recuperar'));

      const res = await request(app).post('/recuperarContrasena').send({ correo: 'favio@example.com' });

      expect(res.statusCode).toBe(500);
      expect(res.body.success).toBe(false);
    });
  });

  // --- RUTAS CON AUTH (token obligatorio) ---

  const rutasProtegidas = [
    { path: '/editarCuidadorNoProfesional', serviceMethod: 'editarCuidadorNoProfesional', successStatus: 201 },
    { path: '/cambiarContrasena', serviceMethod: 'cambiarContrasena', successStatus: 200 },
    { path: '/eliminarCuenta', serviceMethod: 'eliminarCuenta', successStatus: 200 },
  ];

  rutasProtegidas.forEach(({ path, serviceMethod, successStatus }) => {
    describe(`POST ${path}`, () => {
      it('✅ responde success (200 o 201) si token y servicio ok', async () => {
        AutenticacionService[serviceMethod].mockResolvedValue({ mensaje: 'OK' });

        const res = await request(app)
          .post(path)
          .set('Authorization', `Bearer ${token}`)
          .send({ id: 1 });

        expect(res.statusCode).toBe(successStatus);
        expect(res.body.success).toBe(true);
      });

      it('❌ responde 401 si no envías token', async () => {
        const res = await request(app)
          .post(path)
          .send({ id: 1 });

        expect(res.statusCode).toBe(401);
      });

      it('❌ responde 500 si el servicio lanza error', async () => {
        AutenticacionService[serviceMethod].mockRejectedValue(new Error('Error interno'));

        const res = await request(app)
          .post(path)
          .set('Authorization', `Bearer ${token}`)
          .send({ id: 1 });

        expect(res.statusCode).toBe(500);
        expect(res.body.success).toBe(false);
      });
    });
  });

});
