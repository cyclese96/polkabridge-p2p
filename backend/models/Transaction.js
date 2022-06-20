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
  token_amount: {
    type: String,
    require: true,
  },
  fiat_amount: {
    type: String,
    require: true,
  },
  // for a buy order
  // 0: initiated: // no locked token
  // 1: seller has locked token in buy order ad / seller created sell order ad with locked token
  // 2: buyer make his fiat payment to seller and waiting for token release
  // 3: seller released tokens, update order status to done both sides
  // 4: buyer raised an issue. in case seller is not releasing tokens after payment
  // 5: issue resolved by moderator
  // 6: buyer cancelled the order
  // 7: seller cancelled the order: when he joins a buy order ad and no longer want to sell
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
