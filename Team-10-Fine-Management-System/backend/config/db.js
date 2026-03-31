const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',      // Your MySQL username
  password: 'root', // Your MySQL password
  database: 'campus_security',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise(); // Using promise-based wrapper for async/awaits