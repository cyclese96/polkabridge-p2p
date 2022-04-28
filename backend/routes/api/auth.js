const express = require("express");
const router = express.Router();

// middleware

//models
const User = require("../../models/User");
const { getToken } = require("../../_helpers/password-service");
const { recoverSignature } = require("../../_helpers/utils");

// @route GET /api/auth_apis/v1/__test
// @desc Test route
// @access PUBLIC
router.get("/__test", (req, res) => res.send("auth routes working :)"));

// @route GET /api/auth_apis/v1/signatureVerify/:messageHash/:signature/:account
// @desc Verify User wallet
// @access PUBLIC
router.get(
  "/signatureVerify/:messageHash/:signature/:account",
  async (req, res) => {
    try {
      if (
        req.params.messageHash &&
        req.params.signature &&
        req.params.account
      ) {
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

// @route GET /api/auth_apis/v1/user/"user_id"
// @desc Get user buy id
// @access PUBLIC
router.get("/user/:user_id", async (req, res) => {
  try {
    if (!req.params.user_id) {
      return res.status(401).send({ message: "Invalid user id" });
    }

    let user = await User.findById(req.params.user_id);

    if (!user) {
      return res.status(200).send({ message: "User not found" });
    }

    return res.status(200).send(user);
  } catch (error) {
    console.log("user route error ", error);
    res.status(401).send(error);
  }
});

module.exports = router;
