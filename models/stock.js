const mongoose = require("mongoose");
const Joi = require("joi");
const stockSchema = new mongoose.Schema({
  productName: {
    type: String,
    trim: true,
    required: true
  },
  catNumber: {
    type: String
    // required: true
  },
  caseNumber: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    trim: true
    // required: true
  },
  type: {
    type: String,
    trim: true
    // required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  sold: {
    type: Number,
    default: 0
  },
  soldDate: {
    type: String
    // default: Date.now()
  },
  profit: {
    type: Number,
    default: 0
  },
  unit: {
    type: String,
    required: true
  },
  expiryDate: {
    type: String,
    trim: true
    // required: true
  },
  vendorName: {
    type: String,
    trim: true,
    required: true
  },
  purchasePrice: { type: Number, min: 0, required: true },
  purchaseQuantity: { type: Number },
  purchaseDate: { type: Date, default: new Date().toISOString() },
  billPrice: { type: Number }
});
const Stock = mongoose.model("Stock", stockSchema);
function validateStock(stock) {
  const Schema = {
    productName: Joi.string().required(),
    catNumber: Joi.string(),
    caseNumber: Joi.string().required(),
    brand: Joi.string(),
    type: Joi.string(),
    quantity: Joi.number()
      .min(0)
      .required(),
    unit: Joi.string().required(),
    purchasePrice: Joi.number()
      .min(0)
      .required(),
    expiryDate: Joi.string(),
    // .required(),
    vendorName: Joi.string().required()
  };
  return Joi.validate(stock, Schema);
}
module.exports.Stock = Stock;
module.exports.validateStock = validateStock;
