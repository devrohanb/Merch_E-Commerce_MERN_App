const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

// Authentication Routes Controller methods:

// Signup route controller:
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

// SignIn Route Controller
exports.signin = (req, res) => {
  const errors = validationResult(req);
  // Destructuring email and password from user req body:
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  // Looiking for the user/email in database
  User.findOne({ email }, (err, user) => {
    // If user/email not found :
    if (err || !user) {
      return res.status(400).json({
        error: "User email does not exists!",
      });
    }

    // If user found :
    //If user provide wrong password :
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Incorrect Password !!",
      });
    }

    //If user/email and password both correct :(creating a token and set it into a cookie)
    // Creating a Token using jwt:
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    // Puting the token into cookie using cookie-parser :
    res.cookie("token", token, { expire: new Date() + 9999 });

    // Send a response to frontend :
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

// Signout Route Controller
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User Signout Sucessfully",
  });
};

// Protected Routes :
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

// Custom Middlewares :
exports.isAuthenticated = (req, res, next) => {
  // Cheker logic for used is signedIn and authenticated:
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not ADMIN!!, ACCESS DENIED",
    });
  }
  next();
};
