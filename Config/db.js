const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "nodejs-login",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 5, // match your max_user_connections
  queueLimit: 0,
});

// Export promise pool so you can use async/await in controllers
module.exports = pool.promise();
