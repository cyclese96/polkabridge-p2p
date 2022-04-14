const express = require("express");
const router = express.Router();

// middleware

//models
const User = require("../../models/User");
const { getToken } = require("../../_helpers/password-service");
const { recoverSignature } = require("../../_helpers/utils");

// @route GET /api/auth/v1/__test
// @desc Test route
// @access PUBLIC
router.get("/__test", (req, res) => res.send("auth routes working :)"));

router.get(
  "/signatureVerify/:messageHash/:signature/:account",
  async (req, res) => {
    try {
      if (
        req.params.messageHash &&
        req.params.signature &&
        req.params.account
      ) {
        // Signature matches the cache address/challenge
        // Authentication is valid, assign JWT, etc.

        const userAddress = await recoverSignature(
          req.params.messageHash,
          req.params.signature
        );

        if (!userAddress) {
          return res.send({ verified: false });
        }

        if (userAddress?.toLowerCase() !== req.params.account?.toLowerCase()) {
          return res.send({ verified: false });
        }

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
            address: req.params.address,
            name: user.name,
          },
        };
        const jwtToken = await getToken(jwtPayload);

        res.send({ verified: true, jwtToken });
      } else {
        // Sig did not match, invalid authentication
        res.send({ verified: false, jwtToken });
      }
    } catch (error) {
      console.log("route error ", error);
      res.status(401).send(error);
    }
  }
);

module.exports = router;
