const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 3, // ← CHANGE FROM 5 TO 3
  queueLimit: 0,
  //waitForConnections: true,
  //connectionLimit: 5, // matches Clever Cloud's limit
  //queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
    process.exit(1);
  }
  console.log("✅ MySQL Connected....");
  connection.release(); // release back to pool
});

module.exports = pool;
