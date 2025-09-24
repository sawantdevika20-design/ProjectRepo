const db = require("../Config/db");

exports.login = async (req, res) => {
  const { Phone_Number, Password } = req.body;

  if (!Phone_Number || !Password) {
    return res.render("04_Login", { message: "Please fill all fields." });
  }

  try {
    const [results] = await db.query(
      "SELECT * FROM customers WHERE Phone_Number = ? AND Password = ?",
      [Phone_Number, Password]
    );

    if (results.length > 0) {
      req.session.customer = {
        id: results[0].Customer_ID,
        name: results[0].Name,
        phone: results[0].Phone_Number,
      };

      res.redirect(`/03_Customer?Phone_Number=${Phone_Number}`);
    } else {
      res.render("04_Login", { message: "Invalid phone number or password." });
    }
  } catch (err) {
    console.error(err);
    res.render("04_Login", { message: "Something went wrong." });
  }
};

exports.register = async (req, res) => {
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

  if (!Name || !Phone_Number || !Password) {
    return res.render("02_register", {
      message: "Please fill all required fields.",
    });
  }

  try {
    await db.query(
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
      ]
    );

    res.redirect("/04_Login");
  } catch (err) {
    console.error(err);
    res.render("02_register", { message: "Registration failed. Try again." });
  }
};
