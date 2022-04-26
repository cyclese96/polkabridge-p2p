const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FiatSchema = new Schema({
  country_name: {
    type: String,
  },
  fiat: {
    type: String,
  },
  fiat_label: {
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

module.exports = Fiat = mongoose.model("fiats", FiatSchema);
