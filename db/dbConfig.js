// providing a promise-based API for MySQL operations.
const mysql = require("mysql2/promise");

// Read configuration from environment variables
const data = {
  host: "mysql-evangadi-back-end-logic-25917.nodechef.com",
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: 2384, // Use the port provided by NodeChef
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(data);

module.exports = pool;
