const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  order_type: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  order_amount: {
    type: String,
    required: true,
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
  token_deposited: {
    type: String,
  },
  pending_amount: {
    type: String,
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
    default: "submitted", // submitted/ active/ completed / cancelled
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
