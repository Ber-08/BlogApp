const express = require("express");
const userAuth = require("../Controller/authController");
const router = express.Router();

router.post("/register", userAuth.register);
router.post("/login", userAuth.login);
router.post("/logout", userAuth.logout);

module.exports = router;
