const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const { getToken } = require("../../_helpers/password-service");
const {
  recoverSignature,
  isValidUpiId,
  isValidAccountNumber,
} = require("../../_helpers/utils");

// middleware
const auth = require("../../middleware/auth");

//models
const User = require("../../models/User");
const PaymentOption = require("../../models/PaymentOption");

// @route GET /api/auth-apis/v1/signatureVerify/:messageHash/:signature/:account
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
            address: req.params.account,
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

// @route GET /api/auth-apis/v1/user"
// @desc Get user auth token
// @access PUBLIC
router.get("/user", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    return res.status(200).send(user);
  } catch (error) {
    console.log("user route error ", error);
    res.status(401).send(error);
  }
});

// @route PUT /api/auth-apis/v1/user"
// @desc UPDATE user phone and email
// @access AUTHORIZED
router.put(
  "/user",
  [check("email", "Please enter valid email address").isEmail()],
  [check("phone", "Please enter valid phone number").isMobilePhone()],
  [check("fiat", "Please select user default currency").isMongoId()],
  auth,
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const userId = req.user.id;

      const updateObject = req.body;

      await User.findByIdAndUpdate(userId, {
        $set: updateObject,
      });

      const user = await User.findById(userId)
        .populate("fiat")
        .populate("payment_options");

      return res.status(201).send(user);
    } catch (error) {
      console.log("user route error ", error);
      res.status(401).send(error);
    }
  }
);

// @route PUT /api/auth-apis/v1/user"
// @desc UPDATE user payment options
// @access AUTHORIZED
router.put(
  "/user/payment-option",
  [check("payment_mode", "Please enter valid payment option").not().isEmpty()],
  auth,
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // check if upi id is valid with regex
      if (req.body.upi_id) {
        if (!isValidUpiId(req.body.upi_id)) {
          return res.status(400).json({
            errors: [{ msg: "Please enter valid upi id", params: "upi_id" }],
          });
        }
      }

      if (req.body.account_number) {
        if (!isValidAccountNumber(req.body.account_number)) {
          return res.status(400).json({
            errors: [
              {
                msg: "Please enter valid account number ",
                params: "account_number",
              },
            ],
          });
        }
      }

      const userId = req.user.id;

      const paymentOptionObject = req.body;
      paymentOptionObject.user_id = req.user.id;

      const optionDoc = await new PaymentOption(paymentOptionObject).save();

      await User.findByIdAndUpdate(userId, {
        $push: { payment_options: optionDoc._id },
      });

      const user = await User.findById(userId)
        .populate("payment_options")
        .populate("fiats");

      return res.status(201).send(user);
    } catch (error) {
      console.log("user route error ", error);
      res.status(401).send({ errors: [{ msg: "Server error" }] });
    }
  }
);

module.exports = router;
