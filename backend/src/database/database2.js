const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'alzhividaprueba',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const getConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('🟢 Conectado a MySQL');
    return connection;
  } catch (err) {
    console.error('🔴 Error al conectar a la base de datos:', err);
    throw err;
  }
};

module.exports = { getConnection };
