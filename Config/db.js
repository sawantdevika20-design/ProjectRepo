const mysql = require("mysql");
const dotenv = require("dotenv");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "nodejs-login",
  port: process.env.DB_PORT || 3306,
});

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("MySQL Connected....");
  }
});

module.exports = db;
