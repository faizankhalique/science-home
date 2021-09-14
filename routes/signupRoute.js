const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const { User, validateUser, ValidateObjectId } = require("../models/users");
const router = express.Router();
router.get("/", (req, res) => {
  res.render("signup", { title: "Sign-Up" });
});
// router.get("/allusers", async (req, res) => {
//   const users = await User.find();
//   res.status(200).send(users);
// });
router.post("/", async (req, res) => {
  const body = req.body;
  // const { error } = validateUser(body);
  // if (error) {
  //   return res.status(400).send(error.details[0].message);
  // }
  let user = await User.findOne({ email: body.email }); //check mail is unique
  if (user) return res.status(400).send("User Email Already Exist");
  const salt = await bcrypt.genSalt(15);
  const hashPassword = await bcrypt.hash(body.password, salt);
  // const hashConfirmPassword = await bcrypt.hash(body.confirmpassword, salt);
  user = new User(
    _.pick(body, [
      "fullname",
      "email",
      "password",
      // "confirmpassword",
      // "dob",
      "age",
      "gender",
      "phoneno",
      "address",
      "isAdmin"
    ])
  );
  user.password = hashPassword;
  // user.confirmpassword = hashConfirmPassword;
  await user.save();
  // const token = user.getAuthToken();
  // res.send({ user: _.pick(user, ["_id", "email", "fullname", "isAdmin"]) });
  res.json({ message: "Sign-Up successfully" });
});
router.get("/:id", auth, async (req, res) => {
  if (!ValidateObjectId(req.params.id))
    return res.status(400).send("Invalid user _id");
  let user = await User.findById(req.params.id); //check mail is unique
  if (!user) return res.status(400).send("User not Exist");
  res.status(200).send({ user: user });
});
router.put("/:id", auth, async (req, res) => {
  const body = req.body;
  if (!ValidateObjectId(req.params.id))
    return res.status(400).send("Invalid user _id");
  // const { error } = validateUser(body);

  // if (error) {
  //   console.log("error1", error.details[0].message);
  //   return res.status(400).send(error.details[0].message);
  // }
  let user = await User.findById(req.params.id); //check mail is unique
  if (!user) return res.status(400).send("User not Exist");
  if (user.email !== body.email) {
    const nuser = await User.findOne({ email: body.email });
    if (nuser) return res.status(400).send("email Already Exist");
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(body.password, salt);
  (user.fullname = body.fullname),
    (user.email = body.email),
    (user.password = hashPassword),
    (user.age = body.age),
    (user.gender = body.gender),
    (user.phoneno = body.phoneno),
    (user.address = body.address),
    (user.isAdmin = body.isAdmin);
  const result = await user.save();

  res.status(200).send(result);
});
module.exports = router;
