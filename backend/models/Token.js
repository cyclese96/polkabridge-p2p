const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  namee: {
    type: String,
  },
  address: {
    type: String,
  },
  symbol: {
    type: String,
  },
  chain_id: {
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
