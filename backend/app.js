const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

require("dotenv").config();

// const session = require("express-session");

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

// @route GET /api/auth/v1/__test
// @desc Test route
// @access PUBLIC

app.get("/auth/:MetaAddress", metaAuth, (req, res) => {
  // Request a challenge from the server
  console.log("requesting auth challenge ", {
    mauth: req.metaAuth,
    account: req.params.MetaAddress,
  });
  if (req.metaAuth && req.metaAuth.challenge) {
    res.send(req.metaAuth.challenge);
  }
});

app.get("/auth/:MetaMessage/:MetaSignature", metaAuth, async (req, res) => {
  console.log("requesting verify user", { mauth: req.metaAuth });
  try {
    if (req.metaAuth && req.metaAuth.recovered) {
      // Signature matches the cache address/challenge
      // Authentication is valid, assign JWT, etc.
      const userAddress = req.metaAuth.recovered?.toLowerCase();
      let user = await User.findOne({ wallet_address: userAddress });

      if (!user) {
        user = new User({
          wallet_address: userAddress,
        });

        await user.save();
      }

      const jwtPayload = {
        user: {
          id: user.id,
          address: user.wallet_address,
        },
      };
      const jwtToken = await getToken(jwtPayload);

      res.send({ recovered: req.metaAuth.recovered, token: jwtToken });
    } else {
      // Sig did not match, invalid authentication
      res.status(401).send();
    }
  } catch (error) {
    console.log("route error ", error);
    res.status(401).send(error);
  }
});

// const auth = require("./routes/api/auth");
const order = require("./routes/api/order");

// app.use("/api/auth/v1/", auth);
app.use("/api/orders/v1/", order);

module.exports = app;
