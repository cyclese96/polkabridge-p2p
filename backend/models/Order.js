const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// custom id
//
const OrderSchema = new Schema({
  order_type: {
    type: String,
    required: true, // buy/sell
  },
  order_id: {
    // custom order id
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  order_amount: {
    // amount of currrent buy or sell orders
    type: String, // token amounts in wei for buy and sell orders
    required: true,
  },
  pending_amount: {
    // remaining order amount to be sold or bought
    type: String,
  },
  deflationary_deduction: {
    type: String,
  },
  fee_deduction: {
    type: String,
  },
  final_order_amount: {
    type: String,
  },
  deposit_verified: {
    type: Boolean,
    default: false,
  },
  token: {
    type: Schema.Types.ObjectId,
    ref: "tokens",
  },
  fiat: {
    type: Schema.Types.ObjectId,
    ref: "fiats",
  },
  order_unit_price: {
    type: Number,
    required: true,
  },
  order_status: {
    type: String,
    default: "submitted", // submitted / active / completed / cancelled
  },
  payment_options: {
    // payment for buy/sell orders
    type: [String], //options:  upi / neft / imps
    required: true,
  },
  description: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  completed_at: {
    type: Date,
  },
});

module.exports = Order = mongoose.model("orders", OrderSchema);
