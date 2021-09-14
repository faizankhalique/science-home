const express = require("express");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const router = express.Router();
const { User } = require("../models/users");
const sender = "onlinerentalservice16@gmail.com";
const password = "pakistan7863006";

router.post("/", async (req, res) => {
  const email = req.body.email;

  console.log(email);
  const user = await User.findOne({ email: email });
  if (!user) return res.status(404).send("Email not Exist");
  const newPassword = (Math.floor(Math.random() * 2000) + 1900000).toString();
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(newPassword, salt);
  console.log(newPassword);
  user.password = hashPassword;
  //  <--------------------------->
  const receipent = email;
  const subject = "New Password";
  const emailMessage = `your new password is :${newPassword}`;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: sender,
      pass: password
    }
  });

  const mailOptions = {
    from: sender,
    to: receipent,
    subject: subject,
    text: emailMessage

    // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      return res.status(400).send("Network Error");
    } else {
      console.log("info", info);
    }
  });
  const result = await user.save();
  console.log(result);
  res.json({ m: "New Password sent on Your Eamil successfully" });
});
module.exports = router;
