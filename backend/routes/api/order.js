const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const { MINUMUN_SELL_ORDER_AMOUNT } = require("../../config/constants");

// middleware
const auth = require("../../middleware/auth");

// helper functions
const {
  verifyTokenDeposit,
  performDeduction,
  feeDeduction,
  isDeflationary,
  deflationaryDeduction,
  fromWei,
  toWei,
} = require("../../_helpers/utils");

// models
const Order = require("../../models/Order");
const Token = require("../../models/Token");
const Fiat = require("../../models/FiatCurrency");
const { default: BigNumber } = require("bignumber.js");

router.post("/addTokens", async (req, res) => {
  try {
    console.log("req.body", req.body);
    // const tokens = req.body;
    // for (let i = 0; i < tokens?.length; i++) {
    //   let token = await Token.findOne({
    //     symbol: tokens?.[i]?.symbol,
    //     chainId: tokens?.[i]?.chainId,
    //   });
    //   if (!token) {
    //     token = await new Token(tokens?.[i]).save();
    //     console.log("token saved ", token);
    //   } else {
    //     console.log("token already saved");
    //   }
    // }
    res.status(200).json("all tokens saved");
  } catch (error) {
    console.log("token save error ", error);
    res.status(401).json({ success: false, message: error });
  }
});

// @route Post /api/order_apis/v1/create_buy_order"
// @desc Create buy or sell order
// @access Authenticated

router.post(
  "/create_buy_order",
  [check("order_amount", "Order amount required")],
  [check("order_unit_price", "Order unit price required")],
  [check("token", "Please specify token to sell")],
  [check("fiat", "Please specify payment currency")],
  // auth,
  async (req, res) => {
    try {
      const { user, order_amount, token, fiat, order_unit_price } = req.body;

      // user can not create more than 5 active buy orders
      const userActiveOrders = await Order.find({
        order_status: "active",
        order_type: "buy",
        user: user,
      }).countDocuments();

      if (userActiveOrders && userActiveOrders >= 5) {
        return res
          .status(400)
          .json({ message: "You have already created 5 active buy orders" });
      }
      const orderObject = await new Order({
        order_type: "buy",
        user: mongoose.Types.ObjectId(user),
        order_amount: order_amount?.toString(),
        token: mongoose.Types.ObjectId(token),
        fiat: mongoose.Types.ObjectId(fiat),
        order_unit_price: order_unit_price,
        order_status: "active",
      }).save();

      res.status(201).json(orderObject);
    } catch (error) {
      console.log("create_order", error);
      res.status(400).json({ error });
    }
  }
);

// @route Post /api/order_apis/v1/create_sell_order"
// @desc Create sell order
// @access Authenticated

router.post(
  "/create_sell_order",
  [check("order_amount", "Order amount required")], // order amount should be minimum 100 USD or 0.01 ETH equivalent
  [check("order_unit_price", "Order unit price required")],
  [check("token", "Please specify token to sell")],
  [check("fiat", "Please specify payment currency")],
  // auth,
  async (req, res) => {
    try {
      let orderObject;
      const { user, order_amount, token, fiat, order_unit_price } = req.body;

      const currentToken = await Token.findById(token);

      // check minimun order amount, 0.01 for ETH and 1 for rest
      if (!currentToken) {
        return res
          .status(400)
          .json({ message: "You have already created 5 active sell orders" });
      }

      if (
        new BigNumber(order_amount).lt(
          toWei(MINUMUN_SELL_ORDER_AMOUNT?.[currentToken.symbol])
        )
      ) {
        return res.status(400).json({
          message: `Please enter correct order amount! Minimum required order amount ${
            MINUMUN_SELL_ORDER_AMOUNT?.[currentToken.symbol]
          } ${currentToken.symbol}.`,
        });
      }

      // return if user already have submitted sell order, waiting for token deposit
      const userActiveOrders = await Order.findOne({
        order_status: "active",
        order_type: "sell",
        user: user,
      }).countDocuments();
      if (userActiveOrders >= 5) {
        return res
          .status(400)
          .json({ message: "You have already created 5 active sell orders" });
      }

      let remainingAfterDeduction = order_amount;
      const deflationaryDeducted = deflationaryDeduction(
        order_amount,
        currentToken.address
      );
      // deduct 0.5% if token is deflationary
      remainingAfterDeduction = performDeduction(
        order_amount,
        isDeflationary(currentToken.address) ? 0.5 : 0
      );

      const feeDeducted = feeDeduction(remainingAfterDeduction);
      // deduct 1% fee from all token
      remainingAfterDeduction = performDeduction(remainingAfterDeduction, 1);

      // check if there is any existing pending sell order without token deposit
      let pendingSellOrder = await Order.findOne({
        order_status: "submitted",
        order_type: "sell",
        user: mongoose.Types.ObjectId(user).toString(),
      });

      if (pendingSellOrder) {
        // update existing pending order
        await Order.updateOne(
          {
            order_status: "submitted",
            order_type: "sell",
            user: mongoose.Types.ObjectId(user).toString(),
          },
          {
            $set: {
              order_status: "submitted",
              order_type: "sell",
              user: mongoose.Types.ObjectId(user),
              order_amount: order_amount?.toString(),
              deflationary_deduction: deflationaryDeducted,
              fee_deduction: feeDeducted,
              final_order_amount: remainingAfterDeduction,
              token: mongoose.Types.ObjectId(token),
              fiat: mongoose.Types.ObjectId(fiat),
              order_unit_price: order_unit_price,
              created_at: Date.now(),
            },
          }
        );

        pendingSellOrder = await Order.findOne({
          order_status: "submitted",
          order_type: "sell",
          user: mongoose.Types.ObjectId(user).toString(),
        });

        return res.status(201).json(pendingSellOrder);
      }

      orderObject = await new Order({
        order_type: "sell",
        user: mongoose.Types.ObjectId(user).toString(),
        order_amount: order_amount,
        order_amount: order_amount,
        deflationary_deduction: deflationaryDeducted,
        fee_deduction: feeDeducted,
        final_order_amount: remainingAfterDeduction,
        token: mongoose.Types.ObjectId(token).toString(),
        fiat: mongoose.Types.ObjectId(fiat).toString(),
        order_unit_price: order_unit_price,
        token_deposited: 0,
      }).save();

      res.status(201).json(orderObject);
    } catch (error) {
      console.log("create_order", error);
      res.status(400).json({ error });
    }
  }
);
// verify user deposited tokens and set the order status to active
router.post("/verify_deposit", async (req, res) => {
  try {
    const { account, order_id } = req.body;

    const order = await Order.findById(order_id).populate("token");

    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }

    const final_order_amount = order.final_order_amount;
    const tokenAddress = order.token.address;

    const verify = await verifyTokenDeposit(
      final_order_amount,
      tokenAddress,
      account
    );

    return res.status(200).json({ message: "success", verifed: verify });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error });
  }
});

router.get("/orders/:page_number", async (req, res) => {
  try {
    const page = req.params.page_number ? req.params.page_number : 1;
    const orders = await Order.find({})
      .populate("token")
      .populate("user")
      .populate("fiat")
      .limit((page - 1) * 10 + 10)
      .skip((page - 1) * 10)
      .sort({ created_at: -1 });

    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error });
  }
});

router.get("/order/:order_id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.order_id);

    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error });
  }
});

router.get("/order_tokens", async (req, res) => {
  try {
    const tokens = await Token.find({ active: true, chainId: 1 });

    return res.status(200).json(tokens);
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error });
  }
});

module.exports = router;
