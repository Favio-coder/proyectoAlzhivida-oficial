describe('Registro de cuidador no profesional en Alzhivida', () => {
  const emailTest = `test${Date.now()}@mailinator.com`;
  const codigoMock = '123456'; // Simularías este valor si el backend lo permite
  const password = 'Segura123!';

  beforeEach(() => {
    cy.visit('http://localhost:5173/register'); // Asume que la ruta es /register
  });

  it('Paso 1: Verifica que se muestra el formulario de correo', () => {
    cy.get('input[placeholder="Correo electrónico"]').should('be.visible');
    cy.contains('VERIFICAR CORREO').should('be.visible');
  });

  
});
