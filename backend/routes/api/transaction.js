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
const { triggerEvent } = require("../../_helpers/pusher-service");

// @route PUT /api/auth-apis/v1/transaction/test"
// @desc TEST  order routes
// @access
router.get("/transaction/test", async (req, res) => {
  try {
    return res.status(200).send("I'm listening...trxs");
  } catch (error) {
    // console.log("user route error ", error);
    res.status(401).send({ errors: [{ msg: "Server error" }] });
  }
});

// @route Post /transaction-apis/v1/buy-order"
// @desc Create buy order transaction
// @access Authenticated
router.post(
  "/buy-order",
  [check("order_id", "Order is should be valid Object id").isMongoId()],
  [check("token_amount", "Invalid order amount").not().isEmpty()],
  [check("fiat_amount", "Invalid order amount").not().isEmpty()],
  auth,
  async (req, res) => {
    try {
      const errors = validationResult(req);

      const tokenAmountToBuy = req.body.token_amount;
      const fiatAmoount = req.body.fiat_amount;
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
        token_amount: tokenAmountToBuy,
        fiat_amount: fiatAmoount,
        transaction_status: 1,
        transaction_type: "buy",
      };

      // console.log("order", order);
      // console.log("status", {
      //   orderTransactionObject,
      //   orderRemainingAmount,
      //   orderStatus,
      //   tokenAmountToBuy,
      // });

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

      // await triggerEvent("my-channel", "my-event", "order created");

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
  [check("fiat_amount", "Invalid fiat amount").not().isEmpty()],
  auth,
  async (req, res) => {
    try {
      const errors = validationResult(req);

      const tokenAmountToSell = req.body.token_amount;
      const fiatAmountForSellOrder = req.body.fiat_amount;
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
        token_amount: tokenAmountToSell,
        fiat_amount: fiatAmountForSellOrder,
        transaction_status: 0,
        transaction_type: "sell",
      };

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

// @route GET /transaction-apis/v1/order-transactions"
// @desc get buy user order transactions: pending, all
// @access Authenticated
// @params:  page, trx_status
router.get("/order-transactions", auth, async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user.id;

    const page = req.params.page ? req.params.page : 1;
    const itemsToShow = (page - 1) * 10 + 10;
    const itemsToSkip = (page - 1) * 10;

    const query = {};
    const transaction_status = req.query?.trx_status;

    if (transaction_status === "pending") {
      query.transaction_status = { $gte: 0, $lte: 2 };
    } else if (transaction_status === "completed") {
      query.transaction_status = { $in: [3, 5] };
    } else if (transaction_status === "cancelled") {
      query.transaction_status = { $in: [6, 7] };
    } else if (transaction_status === "resolving") {
      // issue raised
      query.transaction_status = 4;
    } else {
      query.transaction_status = { $gte: 0, $lte: 7 };
    }

    const finalQuery = {
      $or: [
        {
          ...query,
          buyer: mongoose.Types.ObjectId(userId),
        },
        {
          ...query,
          seller: mongoose.Types.ObjectId(userId),
        },
      ],
    };

    // console.log("final query ", finalQuery);

    const transactions = await Transaction.find(finalQuery)
      .populate("buyer")
      .populate("seller")
      .populate({
        path: "order",
        populate: [{ path: "token" }, { path: "fiat" }],
      })
      .limit(itemsToShow)
      .skip(itemsToSkip)
      .sort({ created_at: -1 });

    return res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(401).json({ errors: [{ msg: "Server error" }] });
  }
});

// @route GET /transaction-apis/v1/order-transaction/:trx_id"
// @desc get transaction by id
// @access Authenticated
router.get("/order-transaction/:trx_id", auth, async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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

    const finalTrx = await Transaction.findById(transactionId)
      .populate("buyer")
      .populate({ path: "seller", populate: { path: "payment_options" } })
      .populate({
        path: "order",
        populate: [{ path: "token" }, { path: "fiat" }],
      });

    return res.status(200).json(finalTrx);
  } catch (error) {
    console.log(error);
    res.status(401).json({ errors: [{ msg: "Server error" }] });
  }
});

// @route GET /transaction-apis/v1/order/order-transaction/:order_id"
// @desc get user pending transaction by order id
// @access Authenticated
router.get("/order/order-transaction/:order_id", auth, async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user.id;
    const orderId = req.params.order_id;

    if (!mongoose.isValidObjectId(orderId)) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid transaction id" }] });
    }

    // fetch pending transactions

    const pendingOrderQuery = {
      $or: [
        {
          transaction_status: { $gte: 0, $lte: 2 },
          buyer: mongoose.Types.ObjectId(userId),
          order: mongoose.Types.ObjectId(orderId),
        },
        {
          transaction_status: { $gte: 0, $lte: 2 },
          seller: mongoose.Types.ObjectId(userId),
          order: mongoose.Types.ObjectId(orderId),
        },
      ],
    };

    const transaction = await Transaction.findOne(pendingOrderQuery)
      .populate("buyer")
      .populate({ path: "seller", populate: { path: "payment_options" } })
      .populate({
        path: "order",
        populate: [{ path: "token" }, { path: "fiat" }],
      });

    if (!transaction) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Order transaction not found" }] });
    }

    return res.status(200).json(transaction);
  } catch (error) {
    console.log(error);
    res.status(401).json({ errors: [{ msg: "Server error" }] });
  }
});

// @route PATCH /transaction-apis/v1/update/:trx_id"
// @desc update transaction status
// @access Authenticated
router.patch("/update/:trx_id", auth, async (req, res) => {
  try {
    const transactionId = req.params.trx_id;

    if (!mongoose.isValidObjectId(transactionId)) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid transaction id" }] });
    }

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Order transaction not found" }] });
    }

    if (
      transaction?.transaction_status === 1 &&
      transaction?.buyer?.toString() === req.user.id
    ) {
      // buyer can only update transaction if it has status:1, pending fiat payment status
      await Transaction.findByIdAndUpdate(transactionId, {
        $set: { transaction_status: 2 },
      });
    } else if (
      transaction?.transaction_status === 2 &&
      transaction?.seller?.toString() === req.user.id
    ) {
      // seller can only update transaction if it has status:2, pending token relase status
      await Transaction.findByIdAndUpdate(transactionId, {
        $set: { transaction_status: 3 },
      });
    } else {
      return res.status(400).json({
        errors: [{ msg: "Unauthorized access of update order transaction" }],
      });
    }

    const finalTrx = await Transaction.findById(transactionId)
      .populate("buyer")
      .populate({ path: "seller", populate: { path: "payment_options" } })
      .populate({
        path: "order",
        populate: [{ path: "token" }, { path: "fiat" }],
      });

    return res.status(200).json(finalTrx);
  } catch (error) {
    console.log(error);
    res.status(401).json({ errors: [{ msg: "Server error" }] });
  }
});

// @route PATCH /transaction-apis/v1/raise-issue/:trx_id"
// @desc Raise transaction issue
// @access Authenticated
router.patch("/raise-issue/:trx_id", auth, async (req, res) => {
  try {
    const transactionId = req.params.trx_id;

    if (!mongoose.isValidObjectId(transactionId)) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid transaction id" }] });
    }

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Order transaction not found" }] });
    }

    // buyer can cancel the order if he did not make the payment yet or seller did not deposited the token in the order transaction
    if (
      transaction?.buyer?.toString() === req.user.id &&
      transaction?.transaction_status >= 2
    ) {
      await Transaction.findByIdAndUpdate(transactionId, {
        $set: { transaction_status: 6 },
      });
    } else if (
      transaction?.seller?.toString() === req.user.id &&
      transaction?.transaction_status === 0
    ) {
      // seller can cancel the order if he did not deposit the tokens
      await Transaction.findByIdAndUpdate(transactionId, {
        $set: { transaction_status: 7 },
      });
    } else {
      return res
        .status(400)
        .json({ errors: [{ msg: "Unauthorized access of cancel order" }] });
    }

    const finalTrx = await Transaction.findById(transactionId)
      .populate("buyer")
      .populate({ path: "seller", populate: { path: "payment_options" } })
      .populate({
        path: "order",
        populate: [{ path: "token" }, { path: "fiat" }],
      });

    return res.status(200).json(finalTrx);
  } catch (error) {
    console.log(error);
    res.status(401).json({ errors: [{ msg: "Server error" }] });
  }
});

// @route PATCH /transaction-apis/v1/raise-issue/:trx_id"
// @desc Raise transaction issue
// @access Authenticated
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

    // buyer can cancel the order if he did not make the payment yet or seller did not deposited the token in the order transaction
    if (
      transaction?.buyer?.toString() === req.user.id &&
      transaction?.transaction_status < 2
    ) {
      await Transaction.findByIdAndUpdate(transactionId, {
        $set: { transaction_status: 6 },
      });
    } else if (
      transaction?.seller?.toString() === req.user.id &&
      transaction?.transaction_status === 0
    ) {
      // seller can cancel the order if he did not deposit the tokens
      await Transaction.findByIdAndUpdate(transactionId, {
        $set: { transaction_status: 7 },
      });
    } else {
      return res
        .status(400)
        .json({ errors: [{ msg: "Unauthorized access of cancel order" }] });
    }

    // revert deducted pending order amount
    const orderId = transaction?.order;

    const order = await Order.findById(orderId)
      .populate("buyer")
      .populate({ path: "seller", populate: { path: "payment_options" } })
      .populate({
        path: "order",
        populate: [{ path: "token" }, { path: "fiat" }],
      });

    if (!order) {
      return res.status(400).json({
        errors: [{ msg: "No order found for this order transaction" }],
      });
    }

    const newPendingAmount = new BigNumber(order?.pending_amount)
      .plus(transaction?.order_amount)
      ?.toString();

    await Order.findByIdAndUpdate(orderId, {
      $set: { pending_amount: newPendingAmount },
    });

    const finalTrx = await Transaction.findById(transactionId);

    return res.status(200).json(finalTrx);
  } catch (error) {
    console.log(error);
    res.status(401).json({ errors: [{ msg: "Server error" }] });
  }
});
module.exports = router;
