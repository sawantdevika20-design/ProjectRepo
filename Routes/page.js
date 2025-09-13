const express = require("express");
const db = require("../Config/db");
const router = express.Router();

router.get("/01_page", (req, res) => {
  res.render("01_page");
});

router.get("/02_register", (req, res) => {
  res.render("02_register");
});

router.get("/03_Customer", (req, res) => {
  const phone = req.query.phone;
  if (!phone) {
    return res.render("03_Customer", { message: "No phone number provided." });
  }

  db.query(
    "SELECT * FROM customers WHERE Phone_Number = ?",
    [phone],
    (err, results) => {
      if (err || results.length === 0) {
        return res.render("03_Customer", { message: "Customer not found." });
      }

      const customer = results[0];
      res.render("03_Customer", {
        Name: customer.Name,
        Phone_Number: customer.Phone_Number,
        HouseNo: customer.HouseNo,
        Building_Name: customer.Building_Name,
        Street: customer.Street,
        Landmark: customer.Landmark,
        City: customer.City,
        State: customer.State,
        Pincode: customer.Pincode,
      });
    }
  );
});

router.get("/logout", (req, res) => {
  res.redirect("/");
});

module.exports = router;
