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

console.log("env ", { url: process.env.DB_URL, db: process.env.DB });

// routes

const MetaAuth = require("meta-auth");

// middleware

const metaAuth = new MetaAuth({
  banner: "Polkabridge P2P",
});

//models
const User = require("./models/User");
const { getToken } = require("./_helpers/password-service");

const auth = require("./routes/api/auth");
const order = require("./routes/api/order");

app.use("/api/auth/v1/", auth);
app.use("/api/orders/v1/", order);

module.exports = app;
