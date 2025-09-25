const express = require("express");
const path = require("path");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
const pool = require("./Config/db");
const sessionStore = new MySQLStore({}, pool);

// Load env file (default .env, or .env.prod if NODE_ENV=production)
const envFile = process.env.NODE_ENV === "production" ? ".env.prod" : ".env";
dotenv.config({ path: envFile });

const app = express();

// MySQL pool (shared for app + session store)
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT || 3306,
//   waitForConnections: true,
//   connectionLimit: 2, // ← CHANGE FROM 5 TO 3
//   queueLimit: 0,
//   // waitForConnections: true,
//   // connectionLimit: 5,
//   // queueLimit: 0,
// });

app.use(
  session({
    key: "customer_session",
    secret: process.env.SESSION_SECRET || "fallbackSecret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "strict",
    },
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/Uploads")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use("/", require("./Routes/page"));
app.use("/auth", require("./Routes/auth"));
app.use("/Admin", require("./Routes/AdminRoutes"));
app.use("/Products", require("./Routes/ProductsRoutes"));

app.get("/test", (req, res) => {
  res.send("Server is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server started on http://localhost:${PORT}`);
});
