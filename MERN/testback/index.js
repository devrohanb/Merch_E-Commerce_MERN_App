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

app.listen(PORT, () => console.log(`Server started on : ${PORT}`));
