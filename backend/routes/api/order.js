const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const {
  MINUMUN_SELL_ORDER_AMOUNT,
  MAX_ACTIVE_BUY_ORDERS,
} = require("../../config/constants");
const { default: BigNumber } = require("bignumber.js");

// helper functions
const {
  verifyTokenDeposit,
  performDeduction,
  feeDeduction,
  isDeflationary,
  deflationaryDeduction,
  toWei,
  isArrayIncludes,
} = require("../../_helpers/utils");

// middleware
const auth = require("../../middleware/auth");

// models
const Order = require("../../models/Order");
const Token = require("../../models/Token");
const Fiat = require("../../models/FiatCurrency");
const User = require("../../models/User");

// @route PUT /api/auth-apis/v1/order/test"
// @desc TEST  order routes
// @access
router.get("/order/test", auth, async (req, res) => {
  try {
    console.log("requesting test with ", req.user);
    return res.status(200).send("I'm listening...orders");
  } catch (error) {
    // console.log("user route error ", error);
    res.status(401).send({ errors: [{ msg: "Server error" }] });
  }
});

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
  auth,
  async (req, res) => {
    try {
      const {
        order_amount,
        token,
        fiat,
        order_unit_price,
        payment_options,
        description,
      } = req.body;

      const user = req.user?.id;

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
        pending_amount: order_amount?.toString(),
        token: mongoose.Types.ObjectId(token),
        fiat: mongoose.Types.ObjectId(fiat),
        order_unit_price: order_unit_price,
        order_status: "active",
        payment_options: payment_options,
        description: description,
      }).save();

      const order = await Order.findById(orderObject.id)
        .populate("user")
        .populate("token")
        .populate("fiat");
      return res.status(201).json(order);
    } catch (error) {
      console.log("create_order", error);
      res.status(400).json({ errors: [{ msg: "Server error" }] });
    }
  }
);

const ORDER_UPDATE_FIELDS = [
  "order_amount",
  "token",
  "fiat",
  "order_unit_price",
  "payment_options",
  "remarks",
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
        return res.status(400).json({ errors: [{ msg: "Invalid order id" }] });
      }

      const updateObject = req.body;

      const fieldsToUpdate = Object.keys(updateObject);

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
          return res.status(400).json({ errors: [{ msg: "Order not found" }] });
        }
      }

      await Order.findByIdAndUpdate(order_id, {
        $set: updateObject,
      });

      const updatedOrder = await Order.findById(order_id);

      res.status(201).json(updatedOrder);
    } catch (error) {
      res.status(400).json({ errors: [{ msg: "Server error" }] });
    }
  }
);

// @route Post /api/order-apis/v1/sell-order"
// @desc Create sell order
// @access Authenticated
// :todo add authentication and email and phone verification checks to create order
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
  auth,
  async (req, res) => {
    try {
      let orderObject;
      const {
        order_amount,
        token,
        fiat,
        order_unit_price,
        payment_options,
        description,
      } = req.body;

      const user = req.user.id;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log("sell order error ", errors.array());
        return res.status(400).json({ errors: errors.array() });
      }

      const orderToken = await Token.findById(token);

      // check minimun order amount, 0.01 for ETH and 1 for rest
      if (!orderToken) {
        console.log("invalid order token");
        return res.status(400).json({ message: "Invalid token to sell" });
      }

      // check if user has updated his payment methods to sell tokens
      const userObject = await User.findById(user);

      if (userObject?.payment_options?.length === 0) {
        console.log("Please add atleast one payment method");

        return res.status(400).json({
          message: "Please add atleast one payment method to sell your tokens",
        });
      }

      if (
        new BigNumber(order_amount).lt(
          toWei(MINUMUN_SELL_ORDER_AMOUNT?.[orderToken.symbol])
        )
      ) {
        console.log(
          "Please enter correct order amount! Minimum required order amou"
        );
        return res.status(400).json({
          errors: [
            {
              msg: `Please enter correct order amount! Minimum required order amount ${
                MINUMUN_SELL_ORDER_AMOUNT?.[orderToken.symbol]
              } ${orderToken.symbol}.`,
              location: "order_amount",
            },
          ],
        });
      }

      // return if user already have submitted sell order, waiting for token deposit
      const userActiveOrders = await Order.findOne({
        order_status: "active",
        order_type: "sell",
        user: user,
      }).countDocuments();
      if (userActiveOrders >= 5) {
        return res.status(400).json({
          errors: [{ msg: "You have already created 5 active sell orders" }],
        });
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
              pending_amount: remainingAfterDeduction,
              token: mongoose.Types.ObjectId(token),
              fiat: mongoose.Types.ObjectId(fiat),
              order_unit_price: order_unit_price,
              created_at: Date.now(),
              payment_options,
              description,
            },
          }
        );

        pendingSellOrder = await Order.findById(pendingSellOrder.id)
          .populate("user")
          .populate("token")
          .populate("fiat");

        return res.status(201).json(pendingSellOrder);
      }

      orderObject = await new Order({
        order_type: "sell",
        order_id: new Date().getTime(),
        user: mongoose.Types.ObjectId(user).toString(),
        order_amount: order_amount,
        deflationary_deduction: deflationaryDeducted,
        fee_deduction: feeDeducted,
        final_order_amount: remainingAfterDeduction,
        pending_amount: remainingAfterDeduction,
        token: mongoose.Types.ObjectId(token).toString(),
        fiat: mongoose.Types.ObjectId(fiat).toString(),
        order_unit_price: order_unit_price,
        payment_options,
        description,
      }).save();

      const createdOrder = await Order.findById(orderObject.id)
        .populate("user")
        .populate("token")
        .populate("fiat");

      res.status(201).json(createdOrder);
    } catch (error) {
      console.log("create sell order error ", error);
      res.status(400).json({ errors: [{ msg: "Server error" }] });
    }
  }
);

// @route put /api/order_apis/v1/sell-order/:order_id"
// @desc Update sell order
// @access Authenticated
router.put("/sell-order/:order_id", auth, async (req, res) => {
  try {
    const order_id = req.params.order_id;

    if (!mongoose.isValidObjectId(order_id)) {
      return res.status(400).json({ errors: [{ msg: "Invalid order id" }] });
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
              location: "order_amount",
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

    await Order.findByIdAndUpdate(order_id, {
      $set: updateObject,
    });

    const updatedOrder = await Order.findById(order_id);

    res.status(201).json(updatedOrder);
  } catch (error) {
    console.log("create_order", error);
    res.status(400).json({ errors: [{ msg: "Server error" }] });
  }
});

// @route post /api/order-apis/v1/verify-deposit"
// @desc verify sell order token deposit
// @access Authenticated
// Todo: check user access when auth added: only user who created the order can verify deposit status
router.patch("/verify-deposit/:order_id", auth, async (req, res) => {
  try {
    const order_id = req.params.order_id;

    if (!mongoose.isValidObjectId(order_id)) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid order id", location: "params" }] });
    }

    const order = await Order.findById(order_id)
      .populate("token")
      .populate("user");

    if (!order) {
      return res.status(400).json({ errors: [{ msg: "Order not found" }] });
    }

    console.log("order  user", order?.user);
    console.log("req   user", req?.user);
    if (
      order?.user?.wallet_address?.toLowerCase() !==
      req.user?.address?.toLowerCase()
    ) {
      return res.status(400).json({ errors: [{ msg: "Unauthorized access" }] });
    }

    const wallet_address = order.user.wallet_address;

    const final_order_amount = order.final_order_amount;
    const tokenAddress = order.token.address;

    const verify = await verifyTokenDeposit(
      final_order_amount,
      tokenAddress,
      wallet_address
    );

    // console.log("verify", verify);

    if (verify) {
      await Order.findByIdAndUpdate(order_id, {
        $set: { deposit_verified: true, order_status: "active" },
      });
    }

    // const finalOrderStatus = await Order.findById(order_id);

    return res.status(200).json({ verified: verify });
  } catch (error) {
    console.log(error);
    res.status(401).json({ errors: [{ msg: "Server error" }] });
  }
});

// @route patch /api/order-apis/v1/cancel-order"
// @desc cancel an order
// @access Authenticated

router.patch("/cancel-order/:order_id", auth, async (req, res) => {
  try {
    const order_id = req.params.order_id;

    if (!mongoose.isValidObjectId(order_id)) {
      return res.status(400).json({ errors: [{ msg: "Invalid order id" }] });
    }

    const order = await Order.findById(order_id);

    if (!order) {
      return res.status(400).json({ errors: [{ msg: "Order not found" }] });
    }

    if (order.user?.toString() !== req.user.id) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Unauthorized access of order" }] });
    }

    await Order.findByIdAndUpdate(order_id, {
      $set: { order_status: "cancelled" },
    });

    const finalOrderStatus = await Order.findById(order_id);

    return res.status(200).json(finalOrderStatus);
  } catch (error) {
    console.log(error);
    res.status(401).json({ errors: [{ msg: "Server error" }] });
  }
});

// @route get /api/order_apis/v1/orders/:page_number"
// @desc get list of orders with filters
// @access Authenticated
router.get("/orders/:page_number", auth, async (req, res) => {
  try {
    const page = req.params.page_number ? req.params.page_number : 1;

    // prepare filter
    const orderFilter = {};
    if (req.query.order_type) {
      orderFilter.order_type = req.query.order_type;
    }

    orderFilter.order_status = "active";
    if (req.query.order_status) {
      orderFilter.order_status =
        req.query.order_status?.toLowerCase() === "all"
          ? { $in: ["active", "completed", "cancelled"] }
          : req.query.order_status;
    }
    if (req.query.payment_option) {
      orderFilter.payment_options = { $in: req.query.payment_option };
    }
    if (req.query.fiat) {
      orderFilter.fiat = mongoose.Types.ObjectId(req.query.fiat);
    }
    if (req.query.token) {
      orderFilter.token = mongoose.Types.ObjectId(req.query.token);
    }

    if (req.query.user) {
      orderFilter.user = mongoose.Types.ObjectId(req.query.user);
    }
    console.log("orderFilter ", orderFilter);

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
    console.log("get orders error ", error);
    res.status(401).json({ errors: [{ msg: "Server error" }] });
  }
});

router.get("/order/:order_id", auth, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.order_id)) {
      return res.status(400).json({ errors: [{ msg: "Invalid order id" }] });
    }

    const order = await Order.findById(req.params.order_id)
      .populate("user")
      .populate("token")
      .populate("fiat");

    if (!order) {
      return res.status(400).json({ errors: [{ msg: "Order not found" }] });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(401).json({ errors: [{ msg: "Server error" }] });
  }
});

router.get("/order-tokens", auth, async (req, res) => {
  try {
    const tokens = await Token.find({ active: true, chainId: 4 }).limit(10);

    return res.status(200).json(tokens);
  } catch (error) {
    console.log(error);
    res.status(401).json({ errors: [{ msg: "Server error" }] });
  }
});

router.get("/fiats", auth, async (req, res) => {
  try {
    const fiats = await Fiat.find({}).limit(10);

    return res.status(200).json(fiats);
  } catch (error) {
    console.log(error);
    res.status(401).json({ errors: [{ msg: "Server error" }] });
  }
});

const supportedPaymentOptions = [
  {
    _id: 1,
    provider: "upi",
    desc: "UPI",
  },
  {
    _id: 2,
    provider: "neft",
    desc: "Bank Transfer",
  },
  {
    _id: 3,
    provider: "imps",
    desc: "Bank Transfer",
  },
];

router.get("/payment_options", async (req, res) => {
  try {
    return res.status(200).json(supportedPaymentOptions);
  } catch (error) {
    console.log(error);
    res.status(401).json({ errors: [{ msg: "Server error" }] });
  }
});

module.exports = router;
