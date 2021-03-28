const express = require("express");
const router = express.Router();
const { signup, signin, signout, isSignedIn } = require("../controllers/auth");

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

// SignIn Route:
router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Please provide a Valid EmailId !"),
    check("password")
      .isLength({ min: 1 })
      .withMessage("Password Field is Mandatory!"),
  ],
  signin
);

router.get("/signout", signout);

// Testing demo protected route
router.get("/testroute", isSignedIn, (req, res) => {
  res.json(req.auth);
});

module.exports = router;
