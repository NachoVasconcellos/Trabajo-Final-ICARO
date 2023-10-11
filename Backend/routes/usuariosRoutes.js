const express = require("express");
const {
  userAccountValidation,
  loginValidation,
} = require("../middlewares/userValidations");
const { createAccount, login } = require("../controllers/userControllers");
const router = express();
router.post("/", userAccountValidation, createAccount);
router.post("/login", loginValidation, login);
module.exports = router;
