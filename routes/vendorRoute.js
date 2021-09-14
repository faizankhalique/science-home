const express = require("express");
const router = express.Router();
const _ = require("lodash");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const { Vendor, validateVendor } = require("../models/vendor");
router.get("/", async (req, res) => {
  const vendors = await Vendor.find();
  res.render("vendor", { title: "Vendor", vendors });
});
router.get("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const vendor = await Vendor.findById(id);
  if (!vendor)
    return res
      .status(404)
      .send("This vendor already Deleted please Refresh the page");
  res.json({ vendor: vendor });
});
router.post("/", auth, async (req, res) => {
  const body = req.body;
  const { error } = validateVendor(body);
  if (error) return res.status(400).send(error.details[0].message);
  const vendorEmail = await Vendor.findOne({ email: body.email });
  if (vendorEmail) return res.status(400).send("Email Already Exist");
  const vendorUserName = await Vendor.findOne({ userName: body.userName });
  if (vendorUserName) return res.status(400).send("User Name Already Exist");
  let vendorIds = await Vendor.find()
    .select({ vendorId: 1, _id: 0 })
    .sort({ vendorId: -1 });
  if (vendorIds.length == 0) {
    const vendorId = Math.floor(Math.random() * 3000);
    body.vendorId = vendorId;
  } else {
    body.vendorId = parseInt(vendorIds[0].vendorId) + 1;
  }

  const vendor = new Vendor(
    _.pick(body, [
      "firstName",
      "lastName",
      "userName",
      "email",
      "gender",
      "location",
      "address",
      "vendorId",
      "phoneNo"
    ])
  );
  await vendor.save();
  res.json({ message: "vendor add succesfully" });
});
router.put("/:id", auth, async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  // console.log("body", body);
  const { error } = validateVendor(body);
  // if (error) return res.status(400).send(error.details[0].message);
  const orignalVendor = await Vendor.findById(id);
  if (!orignalVendor)
    return res
      .status(404)
      .send("This vendor already Deleted please Refresh the page");
  if (orignalVendor.email !== body.email) {
    const nVendor = await Vendor.findOne({ email: body.email });
    if (nVendor) return res.status(400).send("Email Already Exist");
  }
  if (orignalVendor.userName !== body.userName) {
    const nVendor = await Vendor.findOne({ userName: body.userName });
    if (nVendor) return res.status(400).send("UserName Already Exist");
  }
  const vendor = await Vendor.findByIdAndUpdate(id, {
    firstName: body.firstName,
    lastName: body.lastName,
    userName: body.userName,
    email: body.email,
    gender: body.gender,
    location: body.location,
    address: body.address,
    phoneNo: body.phoneNo
  });
  if (!vendor)
    return res
      .status(404)
      .send("This vendor already Deleted please Refresh the page");

  res.json({ message: "vendor update succesfully" });
});
router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const result = await Vendor.findByIdAndDelete({
    _id: id
  });
  if (!result)
    return res
      .status(404)
      .send("This vendor already Deleted please Refresh the page");
  // console.log(stock);
  res.json({ m: "vendor delete Successfully" });
});
module.exports = router;
