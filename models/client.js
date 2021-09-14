const mongoose = require("mongoose");
const Joi = require("joi");
const clientSchema = new mongoose.Schema({
  clientId: {
    type: Number
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  userName: {
    type: String,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    trim: true
  },
  gender: {
    type: String,

    trim: true
  },
  organization: {
    type: String,

    trim: true
  },
  departmentName: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    maxlength: 256,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  phoneNo: {
    type: String,
    trim: true
  }
});
const Client = mongoose.model("Client", clientSchema);
function validateClient(client) {
  const Schema = {
    firstName: Joi.string().max(256),
    lastName: Joi.string().max(256),
    userName: Joi.string().max(256),
    email: Joi.string().max(256),
    gender: Joi.string()
      .min(4)
      .max(256),
    organization: Joi.string()
    .max(256),
    departmentName: Joi.string()
    .max(256),
    location: Joi.string().max(256),
    address: Joi.string().max(256),
    phoneNo: Joi.string()
      .min(12)
      .max(12)
      .required()
  };
  return Joi.validate(client, Schema);
}
module.exports.Client = Client;
module.exports.validateClient = validateClient;
