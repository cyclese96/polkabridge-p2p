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
if (process?.env.NODE_ENV !== "test") {
  connectDB();
}

const auth = require("./routes/api/auth");
const order = require("./routes/api/order");
const transaction = require("./routes/api/transaction");

app.use("/auth-apis/v1/", auth);
app.use("/order-apis/v1/", order);
app.use("/transaction-apis/v1/", transaction);

module.exports = app;
