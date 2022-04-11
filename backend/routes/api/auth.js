const express = require("express");
const router = express.Router();
const MetaAuth = require("meta-auth");

// middleware

const metaAuth = new MetaAuth({
  banner: "Polkabridge P2P",
});

//models
const User = require("../../models/User");
const { getToken } = require("../../_helpers/password-service");

// @route GET /api/auth/v1/__test
// @desc Test route
// @access PUBLIC
router.get("/__test", (req, res) => res.send("auth routes working :)"));

router.get("/auth/:MetaAddress", metaAuth, (req, res) => {
  // Request a challenge from the server
  console.log("requesting auth challenge ", {
    mauth: req.metaAuth,
    account: req.params.MetaAddress,
  });
  if (req.metaAuth && req.metaAuth.challenge) {
    res.send(req.metaAuth.challenge);
  }
});

router.get("/auth/:MetaMessage/:MetaSignature", metaAuth, async (req, res) => {
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

module.exports = router;
