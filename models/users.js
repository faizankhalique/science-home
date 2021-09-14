const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
Joi.ObjectId = require("joi-objectid")(Joi);
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    maxlength: 256,
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    maxlength: 256,
    trim: true,
    required: true
  },
  // dob: {
  //   type: String,
  //   maxlength: 3,
  //   maxlength: 256,
  //   trim: true,
  //   required: true
  // },
  gender: {
    type: String,
    maxlength: 5,
    trim: true,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    maxlength: 256,
    trim: true,
    required: true
  },
  phoneno: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    maxlength: 256,
    trim: true,
    required: true
  },
  // confirmpassword: {
  //   type: String,
  //
  //   maxlength: 256,
  //   trim: true,
  //   required: true
  // },
  isAdmin: {
    type: Boolean,
    default: false
  }
});
userSchema.methods.getAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      // email: this.email,
      fullname: this.fullname,
      isAdmin: this.isAdmin
    },
    config.get("jwtPrivateKey")
  );
  return token;
};
const User = mongoose.model("User", userSchema);
function validateUser(user) {
  schema = {
    fullname: Joi.string()

      .max(256)
      .required(),
    password: Joi.string()

      .max(255)
      .required(),
    // confirmpassword: Joi.string()
    //   .min(3)
    //   .max(255)
    //   .required(),
    email: Joi.string()
      .email()

      .max(50)
      .required(),
    // dob: Joi.string()
    //   .min(3)
    //   .max(256)
    //   .required(),
    address: Joi.string()

      .max(256)
      .required(),
    phoneno: Joi.string().required(),
    age: Joi.number().required(),
    gender: Joi.string()

      .max(256)
      .required(),
    isAdmin: Joi.boolean()
  };
  return Joi.validate(user, schema);
}
function ValidateObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}
module.exports.User = User;
module.exports.validateUser = validateUser;
module.exports.ValidateObjectId = ValidateObjectId;
