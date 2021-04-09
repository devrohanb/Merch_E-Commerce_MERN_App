require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Importing my routes :
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");

//DB Connection
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

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

//PORT
const port = process.env.PORT || 8000; // process.env.PORT is use to fill the port value provided by remote servers after deployment.

// Starting a Server
app.listen(port, () => {
  console.log(`App is running on port : ${port}`);
});
