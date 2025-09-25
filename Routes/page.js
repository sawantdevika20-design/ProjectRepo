const express = require("express");
const db = require("../Config/db");
const { isLoggedIn } = require("../middleware/Check_Login");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("01_page", {
    customer: req.session.customer || null,
  });
});

router.get("/02_register", (req, res) => {
  res.render("02_register", {
    customer: req.session.customer || null,
  });
});

router.get("/03_Customer", isLoggedIn, (req, res) => {
  const phone = req.session.customer.phone;
  if (!phone) {
    return res.render("03_Customer", {
      message: "No phone number provided.",
      customer: req.session.customer,
    });
  }

  db.query(
    "SELECT * FROM customers WHERE Phone_Number = ?",
    [phone],
    (err, results) => {
      if (err || results.length === 0) {
        return res.render("03_Customer", {
          message: "Customer not found.",
          customer: req.session.customer,
        });
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
        customer: req.session.customer,
      });
    }
  );
});

router.get("/cart", isLoggedIn, (req, res) => {
  res.render("cart", { customer: req.session.customer });
});

router.get("/04_login", (req, res) => {
  res.render("04_Login", {
    customer: req.session.customer || null,
  });
});

router.get("/03_Customer/edit", (req, res) => {
  const phone = req.query.Phone_Number;

  if (!phone) {
    return res.render("05_Edit", {
      message: "No phone number provided.",
      customer: req.session.customer || null,
    });
  }

  db.query(
    "SELECT * FROM customers WHERE Phone_Number = ?",
    [phone],
    (err, results) => {
      if (err || results.length === 0) {
        return res.render("05_Edit", {
          message: "Customer not found.",
          customer: req.session.customer || null,
        });
      }

      const customer = results[0];
      res.render("05_Edit", {
        Name: customer.Name,
        Phone_Number: customer.Phone_Number,
        HouseNo: customer.HouseNo,
        Building_Name: customer.Building_Name,
        Street: customer.Street,
        Landmark: customer.Landmark,
        City: customer.City,
        State: customer.State,
        Pincode: customer.Pincode,
        customer: req.session.customer || null,
      });
    }
  );
});
router.post("/03_Customer/edit", (req, res) => {
  const {
    Phone_Number,
    Name,
    HouseNo,
    Building_Name,
    Street,
    Landmark,
    City,
    State,
    Pincode,
  } = req.body;

  const sql = `
    UPDATE customers SET
      Name = ?,
      HouseNo = ?,
      Building_Name = ?,
      Street = ?,
      Landmark = ?,
      City = ?,
      State = ?,
      Pincode = ?
    WHERE Phone_Number = ?
  `;

  db.query(
    sql,
    [
      Name,
      HouseNo,
      Building_Name,
      Street,
      Landmark,
      City,
      State,
      Pincode,
      Phone_Number,
    ],
    (err, results) => {
      if (err) {
        console.log("Update error:", err);
        return res.render("05_Edit", {
          message: "Failed to update profile.",
          customer: req.session.customer || null,
        });
      }

      res.redirect(`/03_Customer?Phone_Number=${Phone_Number}`);
    }
  );
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Customer logout error:", err);
    }
    res.redirect("/");
  });
});

module.exports = router;
