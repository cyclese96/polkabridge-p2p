const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Order = require("../../models/Order");
// const Token = require("../../models/Token");
const mongoose = require("mongoose");

// middleware

// models

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

router.post(
  "/create_order",
  [check("order_type", "Please specify order type correctly. Buy/Sell")],
  [check("order_amount", "Order amount required")],
  [check("order_unit_price", "Order unit price required")],
  [check("token", "Please specify token to sell")],
  [check("fiat", "Please specify payment currency")],
  async (req, res) => {
    console.log("req.b", req.body);
    try {
      let orderObject;
      if (req.body.order_type === "buy") {
        orderObject = await new Order({
          order_type: req.body.order_type,
          user_id: mongoose.Types.ObjectId(req.body.user_id),
          order_amount: req.body.order_amount,
          token: mongoose.Types.ObjectId(req.body.token),
          fiat: mongoose.Types.ObjectId(req.body.fiat),
          order_unit_price: req.body.order_unit_price,
          order_status: "active",
        }).save();
      } else if (req.body.order_type === "sell") {
        orderObject = await new Order({
          order_type: req.body.order_type,
          user_id: mongoose.Types.ObjectId(req.body.user_id).toString(),
          order_amount: req.body.order_amount,
          token: mongoose.Types.ObjectId(req.body.token).toString(),
          fiat: mongoose.Types.ObjectId(req.body.fiat).toString(),
          order_unit_price: req.body.order_unit_price,
          token_deposited: 0,
        }).save();
      } else {
        return res.status(400).json({ message: "Invalid order type" });
      }

      res.status(200).json(orderObject.toJSON());
    } catch (error) {
      console.log("create_order", error);
      res.status(400).json({ error });
    }
  }
);

// verify user deposited tokens and set the order status to active
router.post("/verify_deposit", async (req, res) => {
  try {
    return res.status(200).json("todo..");
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error });
  }
});

router.get("/orders/:page_number", async (req, res) => {
  try {
    const page = req.params.page_number ? req.params.page_number : 1;
    const orders = await Order.find({})
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
    const order = await Order.findById({ id: req.params.order_id });

    return res.status(200).json(order.toJSON());
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error });
  }
});

module.exports = router;
