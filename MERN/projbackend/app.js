require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose
  .connect(process.env.DATABASE, {
    // process.env.DATABASE is an environment variable, stored in .env file
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database connected sucessfully.");
  })
  .catch(() => {
    console.log("Database connectivity request Failed!!");
  });

const port = process.env.PORT || 8000; // process.env.PORT is use to fill the port value provided by remote servers after deployment.

app.listen(port, () => {
  console.log(`App is running on port : ${port}`);
});
