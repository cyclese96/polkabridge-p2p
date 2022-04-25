const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  name: {
    type: String,
  },
  symbol: {
    type: String,
  },
  address: {
    type: String,
  },
  chainId: {
    type: Number,
  },
  decimals: {
    type: Number,
  },
  logoUri: {
    type: String,
  },
  added_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Token = mongoose.model("tokens", TokenSchema);
