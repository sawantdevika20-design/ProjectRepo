const db = require("../Config/db");
const bcrypt = require("bcryptjs");

exports.register = (req, res) => {
  const {
    Name,
    Phone_Number,
    HouseNo,
    Building_Name,
    Street,
    City,
    State,
    Pincode,
    Landmark,
    Password,
    CnfPassword,
  } = req.body;

  db.query(
    "SELECT Phone_Number FROM customers WHERE Phone_Number = ?",
    [Phone_Number],
    async (error, results) => {
      if (error) {
        console.log(error);
        return res.render("02_register", {
          message: "Database error. Please try again.",
        });
      }

      if (results.length > 0) {
        return res.render("03_Customer", {
          message: "That Phone Number is already registered",
        });
      } else if (Password !== CnfPassword) {
        return res.render("02_register", {
          message: "Passwords do not match",
        });
      }

      let hashedPassword = await bcrypt.hash(Password, 8);

      db.query(
        "INSERT INTO customers SET ?",
        {
          Name,
          Phone_Number,
          HouseNo,
          Building_Name,
          Street,
          City,
          State,
          Pincode,
          Landmark,
          Password: hashedPassword,
        },
        (error, results) => {
          if (error) {
            console.log(error);
            return res.render("02_register", {
              message: "Registration failed. Try again.",
            });
          } else {
            console.log("✅ Registered!", results);
            return res.redirect(`/03_Customer?Phone_Number=${Phone_Number}`);
          }
        }
      );
    }
  );
};

exports.login = (req, res) => {
  const { Phone_Number, Password } = req.body;

  if (!Phone_Number || !Password) {
    return res.render("04_Login", { message: "Please enter both fields" });
  }

  db.query(
    "SELECT * FROM customers WHERE Phone_Number = ?",
    [Phone_Number],
    async (error, results) => {
      if (error) {
        console.log(error);
        return res.render("04_Login", { message: "Database error" });
      }

      if (results.length === 0) {
        return res.render("04_Login", {
          message: "Phone number not registered",
        });
      }

      const customer = results[0];
      const isMatch = await bcrypt.compare(Password, customer.Password);

      if (!isMatch) {
        return res.render("04_Login", { message: "Invalid credentials" });
      }

      res.redirect(`/03_Customer?Phone_Number=${customer.Phone_Number}`);
    }
  );
};
