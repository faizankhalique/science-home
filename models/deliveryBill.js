const mongoose = require("mongoose");
const tableSchema = new mongoose.Schema({
  rows: [
    {
      id: { type: String },
      challanId: { type: String },
      quantity: { type: String },
      productname: { type: String },
      company: { type: String },
      unit: { type: String },
      price: { type: Number },
      totalprice: { type: Number }
    }
  ],
  total: {
    type: Number
  },
  profit: {
    type: Number
  },
  generateDate: {
    type: Date
  },
  generateMonth: {
    type: Number
  },
  generateYear: {
    type: Number
  },
  clientName: {
    type: String
  },
  clientId: {
    type: Number
  },
  challanId: {
    type: String
  }
});
const ChallanBillTable = mongoose.model("ChallanBillTable", tableSchema);
module.exports.ChallanBillTable = ChallanBillTable;
