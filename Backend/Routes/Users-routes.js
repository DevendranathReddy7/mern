const express = require("express");
const userControllers = require("../Controllers/Users-controller");
const { check } = require("express-validator");
const router = express.Router();

router.get("/", userControllers.getUsers);

router.post(
  "/login",
  [check("email").not().isEmail(), check("password").not().isEmpty()],
  userControllers.loginUser
);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").not().isEmpty(),
  ],
  userControllers.signUpUser
);

module.exports = router;
