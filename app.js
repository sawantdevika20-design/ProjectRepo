// app.js
require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

// Routes
const AdminRoutes = require("./Routes/AdminRoutes");
const authRouter = require("./Routes/auth");
const pageRouter = require("./Routes/page");

const app = express();

// --- MySQL session store ---
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "nodejs-login",
  port: process.env.DB_PORT || 3306,
  connectionLimit: 1,
});

// --- Express session ---
app.use(
  session({
    key: "session_id",
    secret: process.env.SESSION_SECRET || "supersecretkey",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
    rolling: true,
  })
);

// --- Middleware for parsing ---
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// --- Serve static files ---
app.use(express.static(path.join(__dirname, "public")));

// --- View engine setup ---
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// --- Global template variables ---
app.use((req, res, next) => {
  res.locals.admin = req.session.user || null;
});
