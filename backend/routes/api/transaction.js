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
  [check("token_amount", "Invalid order amount").not().isEmpty()],
  auth,
  async (req, res) => {
    try {
      const errors = validationResult(req);

      const tokenAmountToBuy = req.body.token_amount;
      const orderId = req.body.order_id;

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userId = req.user.id;

      const order = await Order.findById(orderId);

      if (!order) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Order is no more available" }] });
      }

      // user can not buy his/her own orders
      if (order?.user?.toString() === userId?.toString()) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Can not buy your own sell order" }] });
      }

      // verify order type and it's current status before starting transaction
      if (order?.order_status !== "active") {
        return res
          .status(400)
          .json({ errors: [{ msg: "Order is no more available to buy." }] });
      }

      // check correct order type
      if (order?.order_type !== "sell") {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid order to buy" }] });
      }

      // check if order amount is still available to purchase
      if (new BigNumber(tokenAmountToBuy).gt(order.pending_amount)) {
        return res.status(400).json({
          errors: [{ msg: "Insufficent remaining order amount to buy" }],
        });
      }

      // user should not create multiple transactions within the same order
      const pendingTrxs = await Transaction.find({
        order: mongoose.Types.ObjectId(orderId),
        buyer: mongoose.Types.ObjectId(userId),
        transaction_status: { $lte: 2 },
      });

      if (pendingTrxs && pendingTrxs?.length > 0) {
        return res.status(400).json({
          errors: [
            {
              msg: "You already have a pending buy transaction for this order.",
            },
          ],
        });
      }

      const orderRemainingAmount = new BigNumber(order?.pending_amount)
        .minus(tokenAmountToBuy)
        ?.toString();
      const orderStatus = new BigNumber(orderRemainingAmount).eq(0)
        ? "completed"
        : "active";

      const orderTransactionObject = {
        order: order._id,
        seller: order?.user,
        buyer: userId,
        transaction_status: 0,
      };

      console.log("order", order);
      console.log("status", {
        orderTransactionObject,
        orderRemainingAmount,
        orderStatus,
        tokenAmountToBuy,
      });

      const orderTrx = await new Transaction(orderTransactionObject).save();

      if (!orderTrx?.id) {
        return res.status(400).json({
          errors: [{ msg: "Failed to start order" }],
        });
      }

      const updateRef = await Order.findByIdAndUpdate(orderId, {
        $set: {
          pending_amount: orderRemainingAmount,
          order_status: orderStatus,
        },
      });

      const transaction = await Transaction.findById(orderTrx.id)
        .populate("order")
        .populate("seller")
        .populate("buyer");

      res.status(201).json(transaction);
    } catch (error) {
      console.log("create_order", { error });
      res.status(400).json({ error });
    }
  }
);

// @route Post /transaction-apis/v1/buy-order"
// @desc  Seller create order trx
// @access Authenticated
router.post(
  "/sell-order",
  [check("order_id", "Order is should be valid Object id").isMongoId()],
  [check("token_amount", "Invalid token amount").not().isEmpty()],
  auth,
  async (req, res) => {
    try {
      const errors = validationResult(req);

      const tokenAmountToSell = req.body.token_amount;
      // const fiatAmountForSellOrder = req.body.fiat_amount;
      const orderId = req.body.order_id;

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userId = req.user.id;

      const order = await Order.findById(orderId);

      if (!order) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Order is no more available" }] });
      }

      // user can not buy his/her own orders
      if (order?.user?.toString() === userId?.toString()) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Can not sell your own buy order" }] });
      }

      // verify order type and it's current status before starting transaction
      if (order?.order_status !== "active") {
        return res
          .status(400)
          .json({ errors: [{ msg: "Order is no more available to buy." }] });
      }

      // check correct order type
      if (order?.order_type !== "buy") {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid order to buy" }] });
      }

      // check if order amount is still available to purchase
      if (new BigNumber(tokenAmountToSell).gt(order.pending_amount)) {
        return res.status(400).json({
          errors: [{ msg: "Insufficent remaining order amount to buy" }],
        });
      }

      // user should not create multiple transactions within the same order
      const pendingTrxs = await Transaction.find({
        order: mongoose.Types.ObjectId(orderId),
        seller: mongoose.Types.ObjectId(userId),
        transaction_status: { $lte: 2 },
      });

      if (pendingTrxs && pendingTrxs?.length > 0) {
        return res.status(400).json({
          errors: [
            {
              msg: "You already have a pending sell transaction for this order.",
            },
          ],
        });
      }

      const orderRemainingAmount = new BigNumber(order?.pending_amount)
        .minus(tokenAmountToSell)
        ?.toString();
      const orderStatus = new BigNumber(orderRemainingAmount).eq(0)
        ? "completed"
        : "active";

      const orderTransactionObject = {
        order: order._id,
        seller: userId,
        buyer: order?.user,
        transaction_status: 0,
      };

      console.log("order", order);
      console.log("status", {
        orderTransactionObject,
        orderRemainingAmount,
        orderStatus,
        tokenAmountToSell,
      });

      const orderTrx = await new Transaction(orderTransactionObject).save();

      if (!orderTrx?.id) {
        return res.status(400).json({
          errors: [{ msg: "Failed to start order" }],
        });
      }

      const updateRef = await Order.findByIdAndUpdate(orderId, {
        $set: {
          pending_amount: orderRemainingAmount,
          order_status: orderStatus,
        },
      });

      const transaction = await Transaction.findById(orderTrx.id)
        .populate("order")
        .populate("seller")
        .populate("buyer");

      res.status(201).json(transaction);
    } catch (error) {
      console.log("create_order", { error });
      res.status(400).json({ error });
    }
  }
);

router.patch("/cancel-order/:trx_id", auth, async (req, res) => {
  try {
    const transactionId = req.params.trx_id;

    if (!mongoose.isValidObjectId(transactionId)) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid transaction id" }] });
    }

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(400).json({ errors: [{ msg: "Order not found" }] });
    }
    // check if the requested user is buyer of the transaction
    if (transaction?.buyer?.toString() !== req.user.id) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Unauthorized access of cancel order" }] });
    }

    await Transaction.findByIdAndUpdate(transactionId, {
      $set: { transaction_status: 5 },
    });

    const finalTrx = await Transaction.findById(transactionId);

    return res.status(200).json(finalTrx);
  } catch (error) {
    console.log(error);
    res.status(401).json({ errors: [{ msg: "Server error" }] });
  }
});

module.exports = router;
