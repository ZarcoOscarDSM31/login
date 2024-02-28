const express = require('express');
const mysql = require('mysql2/promise');

const app = express();

// Configuración de la conexión a la base de datos MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'dani123',
  database: 'sensores',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Middleware de CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permitir acceso desde cualquier origen
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // Permitir métodos HTTP
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Permitir encabezados personalizados
  next();
});

// Ruta para obtener los datos de la tabla historial
app.get('/historial', async (req, res) => {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM historial');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener datos de la tabla historial:', error);
    res.status(500).json({ error: 'Error al obtener datos de la tabla historial' });
  }
});

// Puerto en el que escucha el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
