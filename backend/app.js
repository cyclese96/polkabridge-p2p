const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
require("dotenv").config();

//Init Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Connect Database
connectDB();

const auth = require("./routes/api/auth");
const order = require("./routes/api/order");

app.use("/auth-apis/v1/", auth);
app.use("/order-apis/v1/", order);

module.exports = app;
