const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderStatusSchema = new Schema({
  status_code: {
    type: Number,
    required: true,
  },
  status_label: {
    type: String,
    required: true,
  },
});

module.exports = OrderStatus = mongoose.model(
  "transaction_status",
  OrderStatusSchema
);
