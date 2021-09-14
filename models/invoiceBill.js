const mongoose = require("mongoose");
const invoiceTableSchema = new mongoose.Schema({
  rows: [
    {
      id: { type: String },
      quantity: { type: String },
      productname: { type: String },
      company: { type: String },
      price: { type: String },
      productTotal: { type: String }
    }
  ],
  total: {
    type: Number
  },
  generateDate: {
    type: Date
  },
  clientName: {
    type: String
  },
  clientId: {
    type: Number
  }
});
const InvoiceBillTable = mongoose.model("InvoiceBillTable", invoiceTableSchema);
module.exports.InvoiceBillTable = InvoiceBillTable;
