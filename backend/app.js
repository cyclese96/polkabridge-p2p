const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

// const session = require("express-session");

//Init Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Connect Database
// connectDB();

// routes

const auth = require("./routes/api/auth");
const order = require("./routes/api/order");

app.use("/api/auth/v1/", auth);
app.use("/api/orders/v1/", order);

module.exports = app;
