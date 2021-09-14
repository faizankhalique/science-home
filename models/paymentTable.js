const mongoose = require("mongoose");
const paymentTableSchema = new mongoose.Schema({
  clientName: {
    type: String
  },
  clientId: {
    type: Number
  },
  challanId: {
    type: String
  },
  checkNumber: {
    type: String
  },
  debt: {
    type: Number,
    min: 0
  },
  credit: {
    type: Number,
    min: 0
  },
  created_at: {
    type: Date
  },
  update_at: {
    type: Date
  }
});
const PaymentTable = mongoose.model("PaymentTable", paymentTableSchema);
module.exports.PaymentTable = PaymentTable;
