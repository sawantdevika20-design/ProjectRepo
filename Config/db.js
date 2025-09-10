const mysql = require("mysql");
const dotenv = require("dotenv");

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PW,
  database: process.env.DB,
});

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("MySQL Connected....");
  }
});

module.exports = db;
