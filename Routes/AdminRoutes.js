require("dotenv").config();
const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/Check_Admin");

const ADMIN_PHONE = process.env.ADMIN_PHONE;
const ADMIN_PASS = process.env.ADMIN_PASS;

// GET: /Admin/Admin_Login
router.get("/Admin_Login", (req, res) => {
  res.render("Admin/Admin_Login", {
    customer: req.session.customer || null, // Add this for consistency
  });
});

// POST: /Admin/Admin_Login
router.post("/Admin_Login", (req, res) => {
  const { phone, password } = req.body;

  const trimmedPhone = phone.trim();
  const trimmedPassword = password.trim();

  if (trimmedPhone === ADMIN_PHONE && trimmedPassword === ADMIN_PASS) {
    req.session.customer = {
      id: "admin", // Add an ID for consistency
      name: "Admin", // Add a name for display
      role: "admin",
      phone: ADMIN_PHONE,
      isAdmin: true,
      isLoggedIn: true,
    };
    return res.redirect("/Admin/Admin_Dashboard");
  } else {
    return res.render("Admin/Admin_Login", {
      message: "Invalid phone or password",
      customer: req.session.customer || null, // Add this
    });
  }
});

// GET: /Admin/Admin_Dashboard (protected)
router.get("/Admin_Dashboard", isAdmin, (req, res) => {
  res.render("Admin/Admin_Dashboard", {
    customer: req.session.customer, // ✅ Add this line - pass customer data to template
  });
});

router.get("/Products", isAdmin, (req, res) => {
  res.render("Admin/Products", {
    customer: req.session.customer, // ✅ Add this line - pass customer data to template
  });
});

// GET: /Admin/logout
//

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Admin logout error:", err);
    }
    res.redirect("/");
  });
});

module.exports = router;
