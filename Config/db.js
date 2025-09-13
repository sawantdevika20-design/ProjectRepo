const mysql = require("mysql");
const dotenv = require("dotenv");

const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error(" Database connection failed:", err);
  } else {
    console.log("MySQL Connected....");
    connection.release();
  }
});

module.exports = pool;
