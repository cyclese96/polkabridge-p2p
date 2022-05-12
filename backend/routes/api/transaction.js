const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");

const { default: BigNumber } = require("bignumber.js");

// middleware
const auth = require("../../middleware/auth");

// helper functions

// models
const Order = require("../../models/Order");
const Token = require("../../models/Token");
const Fiat = require("../../models/FiatCurrency");
const Transaction = require("../../models/Transaction");

// @route Post /transaction-apis/v1/buy-order"
// @desc Create buy order transaction
// @access Authenticated
router.post(
  "/buy-order",
  [check("order_id", "Order is should be valid Object id").isMongoId()],
  [check("buy_amount", "Invalid order amount").not().isEmpty()],
  auth,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      const otherErrors = [];

      const buyAmount = req.params.buy_amount;

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const order = await Order.findById(req.body.order_id);

      if (!order) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Order is no more available" }] });
      }

      if (order?.order_type !== "sell") {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid order to buy" }] });
      }

      if (new BigNumber(buyAmount).gt(order.pending_amount)) {
        return res.status(400).json({
          errors: [{ msg: "Insufficent remaining order amount to buy" }],
        });
      }

      const orderRemainingAmount = new BigNumber(order?.pending_amount)
        .minus(buyAmount)
        ?.toString();
      const orderStatus = new BigNumber(orderRemainingAmount).eq(0)
        ? "fulfilled"
        : "active";

      const orderTransactionObject = {
        order: order._id,
        seller: order?.user,
        buyer: req.user.id,
        order_status: 0,
      };

      const [updateRef, orderTrx] = await Promise.all([
        Order.findByIdAndUpdate(order._id, {
          $set: {
            pending_amount: orderRemainingAmount,
            order_status: orderStatus,
          },
        }),
        new Transaction(orderTransactionObject).save(),
      ]);

      const transaction = Transaction.findById(orderTrx.id)
        .populate("order")
        .populate("seller")
        .populate("buyer");

      res.status(201).json(transaction);
    } catch (error) {
      console.log("create_order", error);
      res.status(400).json({ error });
    }
  }
);

module.exports = router;
