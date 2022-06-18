const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentOptionSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  payment_mode: {
    // upi(All UPI apps )  / neft (Bank Transfer) / imps (Bank Transfer) // paytm (Paytm transfer)
    type: String,
  },
  paytm_number: {
    type: String,
  },
  upi_provider: {
    // Phone Pay / Paytm / etc
    type: String,
  },
  upi_id: {
    type: String, // validated upi id
  },
  account_number: {
    type: String,
  },
  ifsc_code: {
    type: String,
  },
  bank_name: {
    type: String,
  },
  ac_holder_name: {
    type: String,
  },
  fiat_currency: {
    type: Schema.Types.ObjectId,
    ref: "fiats",
  },
  added_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = PaymentOption = mongoose.model(
  "payment_options",
  PaymentOptionSchema
);
