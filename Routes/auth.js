const express = require("express");
const authController = require("../controller/auth");
const router = express.Router();

router.post("/02_register", authController.register);

router.post("/update-profile", authController.updateProfile);

module.exports = router;
