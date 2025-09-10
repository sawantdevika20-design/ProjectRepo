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

exports.updateProfile = (req, res) => {
  const { Phone_Number, Name, City, State, Street } = req.body;

  db.query(
    "UPDATE customers SET Name = ?, City = ?, State = ?, Street = ? WHERE Phone_Number = ?",
    [Name, City, State, Street, Phone_Number],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.render("edit-profile", {
          message: "Update failed. Try again.",
        });
      }

      return res.redirect(`/03_Customer?phone=${Phone_Number}`);
    }
  );
};
