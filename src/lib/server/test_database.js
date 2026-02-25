import mysql from 'mysql2/promise';

export const db = await mysql.createPool({
  host: 'localhost',
  user: 'Moss',
  password: 'M0$$259',
  database: 'test_database',
  waitForConnections: true,
  connectionLimit: 10
});