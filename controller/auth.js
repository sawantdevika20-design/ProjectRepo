const db = require("../Config/db");

exports.login = (req, res) => {
  const { Phone_Number, Password } = req.body;

  if (!Phone_Number || !Password) {
    return res.render("04_Login", { message: "Please fill all fields." });
  }

  db.query(
    "SELECT * FROM customers WHERE Phone_Number = ? AND Password = ?",
    [Phone_Number, Password],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.render("04_Login", { message: "Something went wrong." });
      }

      if (results.length > 0) {
        // Save customer in session
        req.session.customer = {
          id: results[0].Customer_ID,
          name: results[0].Name,
          phone: results[0].Phone_Number,
        };

        // Login successful → redirect to profile with phone query
        res.redirect(`/03_Customer?Phone_Number=${Phone_Number}`);
      } else {
        res.render("04_Login", {
          message: "Invalid phone number or password.",
        });
      }
    }
  );
};

exports.register = (req, res) => {
  const {
    Name,
    Phone_Number,
    Password,
    HouseNo,
    Building_Name,
    Street,
    Landmark,
    City,
    State,
    Pincode,
  } = req.body;

  // Simple validation
  if (!Name || !Phone_Number || !Password) {
    return res.render("02_register", {
      message: "Please fill all required fields.",
    });
  }

  db.query(
    "INSERT INTO customers (Name, Phone_Number, Password, HouseNo, Building_Name, Street, Landmark, City, State, Pincode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      Name,
      Phone_Number,
      Password,
      HouseNo,
      Building_Name,
      Street,
      Landmark,
      City,
      State,
      Pincode,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.render("02_register", {
          message: "Registration failed. Try again.",
        });
      }

      res.redirect("/04_Login");
    }
  );
};
