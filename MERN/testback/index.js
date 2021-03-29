const express = require("express");
const app = express();

// Building our first server :
const PORT = 8000;

app.get("/", (req, res) => {
  res.send("Hello MERN Stack");
});

app.get("/register", (req, res) => {
  res.send("Registration Form");
});

// Middleware testing :
const admin = (req, res) => {
  return res.send("This is Admin !!");
};

// Our custom middlewares
const isLoggedIn = (req, res, next) => {
  let loggedIn = true;
  if (loggedIn) {
    console.log("isLoggedIn gave us the positive response");
    next();
  } else {
    console.error("Sorry, you need to logIn first.");
  }
};

const isAdmin = (req, res, next) => {
  //Faking admin rights condition just for testing
  let admin = "admin";
  if (admin === "admin") {
    console.log("isAdmin gave us the positive response");
    next();
  } else {
    console.error("Sorry you don't have Admin rights!!");
  }
};

// Express Route with Middleware :
app.get("/admin", isLoggedIn, isAdmin, admin);

app.listen(PORT, () => console.log(`Server started on : ${PORT}`));
