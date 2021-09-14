const mongoose = require("mongoose");
const productsLedgerSchema = new mongoose.Schema({
  productName: {
    type: String
  },
  particulars: {
    type: String
  },
  vendorName: {
    type: String
  },
  clientName: {
    type: String
  },
  recievedQuantity: {
    type: String
  },
  issuedQuantity: {
    //saleQuantity
    type: Number
  },
  balance: {
    //remainingQuantity
    type: Number
  },
  unitPrice: {
    type: Number
  },
  totalBill: {
    type: Number
  },
  date: {
    type: Date,
    default: new Date().toISOString()
  },
  debet: {
    type: Number
  },
  credit: {
    type: Number
  }
});
const ProductsLedger = mongoose.model("ProductsLedger", productsLedgerSchema);
module.exports.ProductsLedger = ProductsLedger;
