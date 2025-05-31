const sql = require('mssql');

const config = {
  user: 'sa',
  password: '2005200739',
  server: 'FAVIO',
  database: 'alzhividaPrueba',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  }
};

let pool;

const getConnection = async () => {
  try {
    if (!pool) {
      pool = await sql.connect(config);
      console.log('🟢 Conectado a SQL Server');
    }
    return pool;
  } catch (err) {
    console.error('🔴 Error al conectar a la base de datos:', err);
    throw err;
  }
};

module.exports = { sql, getConnection };
