const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  wallet_address: {
    type: String,
  },
  email: {
    type: String,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
  },
  phone_verified: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
  },
  fiat: {
    type: mongoose.Types.ObjectId,
    ref: "fiats",
  },
  availableFrom: {
    type: Date,
  },
  availableTo: {
    type: Date,
  },
  payment_options: {
    type: [Schema.Types.ObjectId],
    ref: "payment_options",
  },
  registered_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = User = mongoose.model("users", UserSchema);
