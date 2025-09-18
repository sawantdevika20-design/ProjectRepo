const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const app = express();

const sessionStore = new MySQLStore({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "nodejs-login",
  port: process.env.DB_PORT || 3306,
});

app.use(
  session({
    key: "customer_session",
    secret: "supersecretkey", // change to something secure
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
// Default to .env.local if not in production
const envFile =
  process.env.NODE_ENV === "production" ? ".env.prod" : ".env.local";
dotenv.config({ path: envFile });

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

const pageRouter = require("./Routes/page");
app.use("/", pageRouter);

const authRouter = require("./Routes/auth");
app.use("/auth", authRouter);

// Test route
app.get("/test", (req, res) => {
  res.send("Server is running on localhost:5000 🚀");
});

// Start server (ONLY ONCE!)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server started on http://localhost:${PORT}`);
});
