const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const app = express();

dotenv.config({ path: "./.env" });

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

const authRouter = require("./Routes/auth");
app.use("/auth", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
