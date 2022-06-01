const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  order: {
    type: Schema.Types.ObjectId,
    ref: "orders",
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  // for a buy order
  // 0: initiated
  // 1: buyer make payment to seller
  // 2: seller confirmed payment
  // 3: seller released tokens
  // 4: trx time period expired and cancelled
  // 5: order cancelled by buyer
  // 4: issue raised with the trx
  // 5: issue resolved with the trx
  transaction_status: {
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
