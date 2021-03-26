const User = require("../models/user");
const { check, validationResult } = require("express-validator");
// Authentication Routes Controller methods:

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in the Database !!",
      });
    }
    res.json({
      message: "User added successfully",
      id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
    });
  });
};

exports.signout = (req, res) => {
  res.json({
    message: "User Signout",
  });
};

exports.signin = (req, res) => {
  res.json({
    message: "User SignIn",
  });
};
