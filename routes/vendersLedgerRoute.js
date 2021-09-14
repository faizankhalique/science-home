const express = require("express");
const router = express.Router();
const { ProductsLedger } = require("../models/productsLedger");
const { Client } = require("../models/client");
const { AddDebet } = require("../models/addDebet");
const { Vendor } = require("../models/vendor");
router.get("/", async (req, res) => {
  const productsLedgers = await ProductsLedger.find({
    totalBill: { $exists: true }
  });
  const vendorsDebet = await AddDebet.find();
  const vendors = await Vendor.find();
  res.render("vendorsledger", {
    title: "Vendors-Ledger",
    productsLedgers,
    vendors,
    vendorsDebet
  });
});
module.exports = router;
