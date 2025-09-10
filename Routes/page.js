const express = require("express");
const db = require("../Config/db");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("01_page");
});

router.get("/02_register", (req, res) => {
  res.render("02_register");
});

router.get("/03_Customer", (req, res) => {
  const Phone_Number = req.query.Phone_Number;
  if (!Phone_Number) {
    return res.render("03_Customer", { message: "No phone number provided." });
  }

  db.query(
    "SELECT * FROM customers WHERE Phone_Number = ?",
    [Phone_Number],
    (err, results) => {
      if (err || results.length === 0) {
        return res.render("03_Customer", { message: "Customer not found." });
      }

      const customers = results[0];
      res.render("03_Customer", {
        Name: customers.Name,
        Phone_Number: customers.Phone_Number,
        HouseNo: customers.HouseNo,
        Building_Name: customers.Building_Name,
        Street: customers.Street,
        Landmark: customers.Landmark,
        City: customers.City,
        State: customers.State,
        Pincode: customers.Pincode,
      });
    }
  );
});

router.get("/edit-profile", (req, res) => {
  res.render("edit-profile", {
    Name: customers.Name,
    Phone_Number: customers.Phone_Number,
    HouseNo: customers.HouseNo,
    Building_Name: customers.Building_Name,
    Street: customers.Street,
    Landmark: customers.Landmark,
    City: customers.City,
    State: customers.State,
    Pincode: customers.Pincode,
  });
});

router.get("/logout", (req, res) => {
  res.redirect("/");
});

module.exports = router;
