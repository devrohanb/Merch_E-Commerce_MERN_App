const express = require("express");
const router = express.Router();
const { signup, signin, signout } = require("../controllers/auth");

//Express-validator:
const { check, validationResult } = require("express-validator");

// SignUp route :
router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 5 })
      .withMessage("Name should be at least 5 character long !!"),
    check("email").isEmail().withMessage("Please provide a valid email id !!"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Password should be of 5 character at least !!"),
  ],
  signup
);

router.get("/signin", signin);
router.get("/signout", signout);

module.exports = router;
