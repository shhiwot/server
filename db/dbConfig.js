// providing a promise-based API for MySQL operations.

const mysql = require("mysql2/promise");

const data = {
  host: "localhost",
  user: process.env.user,
  password: process.env.password,
  database:process.env.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(data);

module.exports = pool;