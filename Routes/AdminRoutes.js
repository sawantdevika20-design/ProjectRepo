const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/Check_Admin");

const ADMIN_PHONE = process.env.ADMIN_PHONE;
const ADMIN_PASS = process.env.ADMIN_PASS;

// GET login page
router.get("/login", (req, res) => {
  res.render("Admin/Admin_Login");
});

// POST login
router.post("/login", (req, res) => {
  const { phone, password } = req.body;

  const trimmedPhone = phone.trim();
  const trimmedPassword = password.trim();

  console.log("Received from form:", trimmedPhone, trimmedPassword);
  console.log("Expecting:", ADMIN_PHONE, ADMIN_PASS);

  if (trimmedPhone === ADMIN_PHONE && trimmedPassword === ADMIN_PASS) {
    req.session.user = { role: "admin", phone: ADMIN_PHONE };
    return res.redirect("/admin/dashboard");
  } else {
    return res.render("Admin/Admin_Login", {
      message: "Invalid phone or password",
    });
  }
});

// GET dashboard (protected)
router.get("/dashboard", isAdmin, (req, res) => {
  res.render("Admin/Admin_Dashboard");
});

// GET logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/01_Page");
  });
});

module.exports = router;
