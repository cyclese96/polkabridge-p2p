const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  order_type: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  order_amount: {
    type: Number,
    required: true,
  },
  pending_amount: {
    type: Number,
    required: true,
  },
  from_token: {
    type: Schema.Types.ObjectId,
    ref: "tokens",
  },
  to_fiat: {
    type: Schema.Types.ObjectId,
    ref: "fiat_currencies",
  },
  order_unit_price: {
    type: Number,
    required: true,
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
