const express = require("express");
const authController = require("../controller/auth");
const router = express.Router();

router.post("/02_register", authController.register);

router.get("/04_Login", (req, res) => {
  res.render("04_Login");
});
router.post("/Login", authController.login);

module.exports = router;
