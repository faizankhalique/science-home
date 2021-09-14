const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/users");
const router = express.Router();
router.get("/", (req, res) => {
  res.render("login", { title: "Log-In" });
});
router.post("/", async (req, res) => {
  // const { error } = validateLogin(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Incorrect email");
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Password");
  const token = user.getAuthToken();
  res.status(200).send({ token: token, user_id: user._id });
});
function validateLogin(user) {
  schema = {
    email: Joi.string()
      .email()
      .min(3)
      .max(255)
      .required(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required()
  };
  return Joi.validate(user, schema);
}
module.exports = router;
