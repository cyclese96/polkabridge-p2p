const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const {
  MINUMUN_SELL_ORDER_AMOUNT,
  MAX_ACTIVE_BUY_ORDERS,
} = require("../../config/constants");

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
  isArrayIncludes,
} = require("../../_helpers/utils");

// models
const Order = require("../../models/Order");
const Token = require("../../models/Token");
const Fiat = require("../../models/FiatCurrency");
const { default: BigNumber } = require("bignumber.js");
const { update } = require("../../models/Order");

// // test route
// router.post("/addTokens", async (req, res) => {
//   try {
//     console.log("req.body", req.body);
//     // const tokens = req.body;
//     // for (let i = 0; i < tokens?.length; i++) {
//     //   let token = await Token.findOne({
//     //     symbol: tokens?.[i]?.symbol,
//     //     chainId: tokens?.[i]?.chainId,
//     //   });
//     //   if (!token) {
//     //     token = await new Token(tokens?.[i]).save();
//     //     console.log("token saved ", token);
//     //   } else {
//     //     console.log("token already saved");
//     //   }
//     // }
//     res.status(200).json("all tokens saved");
//   } catch (error) {
//     console.log("token save error ", error);
//     res.status(401).json({ success: false, message: error });
//   }
// });

// @route Post /api/order_apis/v1/buy-order"
// @desc Create buy order
// @access Authenticated
router.post(
  "/buy-order",
  [check("order_amount", "Order amount required").not().isEmpty()],
  [check("order_unit_price", "Order unit price required").not().isEmpty()],
  [check("token", "Please specify token to sell").not().isEmpty()],
  [check("fiat", "Please specify payment currency").not().isEmpty()],
  [
    check(
      "payment_options",
      "Please add payment option for the order"
    ).isArray(),
  ],
  // auth,
  async (req, res) => {
    try {
      const {
        user,
        order_amount,
        token,
        fiat,
        order_unit_price,
        payment_options,
      } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // user can not create more than 5 active buy orders
      const userActiveOrders = await Order.find({
        order_status: "active",
        order_type: "buy",
        user: user,
      }).countDocuments();

      console.log("buy orders ", userActiveOrders);
      if (userActiveOrders && userActiveOrders >= MAX_ACTIVE_BUY_ORDERS) {
        return res.status(400).json({
          errors: [{ msg: "You have already created 5 active buy orders" }],
        });
      }

      const orderObject = await new Order({
        order_type: "buy",
        order_id: new Date().getTime(),
        user: mongoose.Types.ObjectId(user),
        order_amount: order_amount?.toString(),
        token: mongoose.Types.ObjectId(token),
        fiat: mongoose.Types.ObjectId(fiat),
        order_unit_price: order_unit_price,
        order_status: "active",
        payment_options,
      }).save();

      res.status(201).json(orderObject);
    } catch (error) {
      console.log("create_order", error);
      res.status(400).json({ error });
    }
  }
);

const ORDER_UPDATE_FIELDS = [
  "order_amount",
  "token",
  "fiat",
  "order_unit_price",
  "payment_options",
];

// @route put /api/order_apis/v1/buy-order/:order_id"
// @desc Update buy order
// @access Authenticated
router.put(
  "/buy-order/:order_id",

  // auth,
  async (req, res) => {
    try {
      const order_id = req.params.order_id;

      if (!mongoose.isValidObjectId(order_id)) {
        return res.status(400).json({ message: "Invalid order id" });
      }

      const updateObject = req.body;

      const fieldsToUpdate = Object.keys(updateObject);

      console.log("fields to update ", fieldsToUpdate);
      if (!isArrayIncludes(ORDER_UPDATE_FIELDS, fieldsToUpdate)) {
        return res
          .status(400)
          .json({ errors: { msg: "Invalid fields to update" } });
      }

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const order = await Order.findById(order_id);
      if (!order) {
        if (!mongoose.isValidObjectId(order_id)) {
          return res.status(400).json({ message: "Order not found" });
        }
      }

      await Order.findByIdAndUpdate(order_id, {
        $set: updateObject,
      });

      const updatedOrder = await Order.findById(order_id);

      res.status(201).json(updatedOrder);
    } catch (error) {
      console.log("create_order", error);
      res.status(400).json({ error });
    }
  }
);

// @route Post /api/order-apis/v1/sell-order"
// @desc Create sell order
// @access Authenticated
router.post(
  "/sell-order",
  [check("order_amount", "Order amount required").not().isEmpty()], // order amount should be minimum 100 USD or 0.01 ETH equivalent
  [check("order_unit_price", "Order unit price required").isNumeric()],
  [check("token", "Please specify token to sell").not().isEmpty()],
  [check("fiat", "Please specify payment currency").not().isEmpty()],
  [
    check(
      "payment_options",
      "Please add payment option for the order"
    ).isArray(),
  ],

  // auth,
  async (req, res) => {
    try {
      let orderObject;
      const {
        user,
        order_amount,
        token,
        fiat,
        order_unit_price,
        payment_options,
      } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const orderToken = await Token.findById(token);

      // check minimun order amount, 0.01 for ETH and 1 for rest
      if (!orderToken) {
        return res.status(400).json({ message: "Invalid token to sell" });
      }

      if (
        new BigNumber(order_amount).lt(
          toWei(MINUMUN_SELL_ORDER_AMOUNT?.[orderToken.symbol])
        )
      ) {
        return res.status(400).json({
          message: `Please enter correct order amount! Minimum required order amount ${
            MINUMUN_SELL_ORDER_AMOUNT?.[orderToken.symbol]
          } ${orderToken.symbol}.`,
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

      // order amount fee deduction computations start
      let remainingAfterDeduction = order_amount;
      const deflationaryDeducted = deflationaryDeduction(
        order_amount,
        orderToken.address
      );
      // deduct 0.5% if token is deflationary
      remainingAfterDeduction = performDeduction(
        order_amount,
        isDeflationary(orderToken.address) ? 0.5 : 0
      );

      const feeDeducted = feeDeduction(remainingAfterDeduction);
      // deduct 1% fee from all token
      remainingAfterDeduction = performDeduction(remainingAfterDeduction, 1);

      // order amount fee deduction computations end

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
              order_id: new Date().getTime(),
              user: mongoose.Types.ObjectId(user),
              order_amount: order_amount?.toString(),
              deflationary_deduction: deflationaryDeducted,
              fee_deduction: feeDeducted,
              final_order_amount: remainingAfterDeduction,
              token: mongoose.Types.ObjectId(token),
              fiat: mongoose.Types.ObjectId(fiat),
              order_unit_price: order_unit_price,
              created_at: Date.now(),
              payment_options,
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
        order_id: new Date().getTime(),
        user: mongoose.Types.ObjectId(user).toString(),
        order_amount: order_amount,
        order_amount: order_amount,
        deflationary_deduction: deflationaryDeducted,
        fee_deduction: feeDeducted,
        final_order_amount: remainingAfterDeduction,
        token: mongoose.Types.ObjectId(token).toString(),
        fiat: mongoose.Types.ObjectId(fiat).toString(),
        order_unit_price: order_unit_price,
        payment_options,
      }).save();

      res.status(201).json(orderObject);
    } catch (error) {
      console.log("create_order", error);
      res.status(400).json({ error });
    }
  }
);

// @route put /api/order_apis/v1/sell-order/:order_id"
// @desc Update sell order
// @access Authenticated
router.put(
  "/sell-order/:order_id",
  // auth,
  async (req, res) => {
    try {
      const order_id = req.params.order_id;

      if (!mongoose.isValidObjectId(order_id)) {
        return res.status(400).json({ message: "Invalid order id" });
      }

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const updateObject = req.body;
      const fieldsToUpdate = Object.keys(updateObject);

      console.log("fields to update ", fieldsToUpdate);
      if (!isArrayIncludes(ORDER_UPDATE_FIELDS, fieldsToUpdate)) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid fields to update" }] });
      }

      const order = await Order.findById(order_id);
      if (!order) {
        if (!mongoose.isValidObjectId(order_id)) {
          return res.status(400).json({ errors: [{ msg: "Order not found" }] });
        }
      }

      const tokenId = order.token;
      const orderToken = await Token.findById(tokenId);
      // check minimun order amount, 0.01 for ETH and 1 for rest
      if (!orderToken) {
        return res
          .status(400)
          .json({ erros: [{ msg: "Invalid token to sell" }] });
      }

      // check if update includes order amount to be updated then adjust new duductions
      if (fieldsToUpdate.includes("order_amount")) {
        if (
          new BigNumber(order.order_amount).lt(
            toWei(MINUMUN_SELL_ORDER_AMOUNT?.[orderToken.symbol])
          )
        ) {
          return res.status(400).json({
            errors: [
              {
                msg: `Please enter correct order amount! Minimum required order amount ${
                  MINUMUN_SELL_ORDER_AMOUNT?.[orderToken.symbol]
                } ${orderToken.symbol}.`,
              },
            ],
          });
        }

        // order amount fee deduction computations start
        let remainingAfterDeduction = order.order_amount;
        const deflationaryDeducted = deflationaryDeduction(
          order.order_amount,
          orderToken.address
        );
        // deduct 0.5% if token is deflationary
        remainingAfterDeduction = performDeduction(
          remainingAfterDeduction,
          isDeflationary(orderToken.address) ? 0.5 : 0
        );

        const feeDeducted = feeDeduction(remainingAfterDeduction);
        // deduct 1% fee from all token
        remainingAfterDeduction = performDeduction(remainingAfterDeduction, 1);

        // order amount fee deduction computations end

        updateObject.deflationary_deduction = deflationaryDeducted;
        updateObject.fee_deduction = feeDeducted;
        updateObject.final_order_amount = remainingAfterDeduction;
      }

      console.log("update object ", updateObject);

      await Order.findByIdAndUpdate(order_id, {
        $set: updateObject,
      });

      const updatedOrder = await Order.findById(order_id);

      res.status(201).json(updatedOrder);
    } catch (error) {
      console.log("create_order", error);
      res.status(400).json({ error });
    }
  }
);

// @route post /api/order-apis/v1/verify-deposit"
// @desc verify sell order token deposit
// @access Authenticated
// Todo: check user access when auth added: only user who created the order can verify deposit status
router.put("/verify-deposit/:order_id", async (req, res) => {
  try {
    const order_id = req.params.order_id;

    if (!mongoose.isValidObjectId(order_id)) {
      return res
        .status(400)
        .json({ errors: [{ message: "Invalid order id" }] });
    }

    const order = await Order.findById(order_id)
      .populate("token")
      .populate("user");

    if (!order) {
      return res.status(400).json({ errors: [{ message: "Order not found" }] });
    }

    const wallet_address = order.user.wallet_address;

    const final_order_amount = order.final_order_amount;
    const tokenAddress = order.token.address;

    const verify = await verifyTokenDeposit(
      final_order_amount,
      tokenAddress,
      wallet_address
    );

    if (verify) {
      await Order.findByIdAndUpdate(order_id, {
        $set: { deposit_verified: true, order_status: "active" },
      });
    }

    const finalOrderStatus = await Order.findById(order_id);

    return res.status(200).json(finalOrderStatus);
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error });
  }
});

// @route get /api/order_apis/v1/orders/:page_number"
// @desc get list of orders with filters
// @access Authenticated
router.get("/orders/:page_number", async (req, res) => {
  try {
    const page = req.params.page_number ? req.params.page_number : 1;

    // prepare filter
    const orderFilter = {};
    if (req.query.order_type) {
      orderFilter.order_type = req.query.order_type;
    }
    if (req.query.order_status) {
      orderFilter.order_status = req.query.order_status;
    }
    if (req.query.payment_option) {
      orderFilter.payment_options = { $in: req.query.payment_option };
    }

    // prepare sorting
    let sortBy = {};
    if (req.query.order_by === "order_amount") {
      sortBy = { order_amount: req.query.order_direction === "desc" ? 1 : -1 };
    } else {
      sortBy = { created_at: req.query.order_direction === "desc" ? 1 : -1 };
    }

    // apply filter
    const orders = await Order.find(orderFilter)
      .populate("token")
      .populate("user")
      .populate("fiat")
      .limit((page - 1) * 10 + 10)
      .skip((page - 1) * 10)
      .sort(sortBy);

    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error });
  }
});

router.get("/order/:order_id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.order_id)) {
      return res.status(400).json({ message: "Invalid order id" });
    }

    const order = await Order.findById(req.params.order_id);

    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error });
  }
});

router.get("/order-tokens", async (req, res) => {
  try {
    const tokens = await Token.find({ active: true, chainId: 1 }).limit(10);

    return res.status(200).json(tokens);
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error });
  }
});

module.exports = router;
