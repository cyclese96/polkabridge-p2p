const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  order_id: {
    type: Schema.Types.ObjectId,
    ref: "orders",
  },
  seller_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  buyer_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  order_status: {
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

module.exports = Transaction = mongoose.model(
  "transactions",
  TransactionSchema
);
