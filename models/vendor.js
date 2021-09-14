const mongoose = require("mongoose");
const Joi = require("joi");
const vendorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    maxlength: 256,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    maxlength: 256,
    trim: true,
    required: true
  },
  userName: {
    type: String,
    unique: true,
    maxlength: 256,
    trim: true,
    required: true
  },
  vendorId: {
    type: Number
  },
  email: {
    type: String,
    unique: true,
    maxlength: 256,
    trim: true,
    required: true
  },
  gender: {
    type: String,

    maxlength: 256,
    trim: true,
    required: true
  },
  location: {
    type: String,
    maxlength: 256,
    trim: true,
    required: true
  },
  address: {
    type: String,
    maxlength: 256,
    trim: true,
    required: true
  },
  phoneNo: {
    type: String,
    minlength: 12,
    maxlength: 12,
    trim: true,
    required: true
  }
});
const Vendor = mongoose.model("Vendor", vendorSchema);
function validateVendor(vendor) {
  const Schema = {
    firstName: Joi.string()
      .max(256)
      .required(),
    lastName: Joi.string()
      .max(256)
      .required(),

    userName: Joi.string()
      .max(256)
      .required(),
    vendorId: Joi.number(),
    email: Joi.string()
      .max(256)
      .required(),
    gender: Joi.string()
      .min(4)
      .max(256)
      .required(),
    location: Joi.string()
      .max(256)
      .required(),
    address: Joi.string()
      .max(256)
      .required(),
    phoneNo: Joi.string()
      .min(12)
      .max(12)
      .required()
  };
  return Joi.validate(vendor, Schema);
}
module.exports.Vendor = Vendor;
module.exports.validateVendor = validateVendor;
