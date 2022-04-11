const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FiatSchema = new Schema({
  country_code: {
    type: String,
  },
  label: {
    type: String,
  },
  flag_uri: {
    type: String,
  },
  added_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Fiat = mongoose.model("fiat_currencies", FiatSchema);