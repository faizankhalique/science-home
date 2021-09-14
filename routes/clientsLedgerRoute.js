const express = require("express");
const router = express.Router();
const { ProductsLedger } = require("../models/productsLedger");
const { Client } = require("../models/client");
const { Stock } = require("../models/stock");
const { Vendor } = require("../models/vendor");
router.get("/", async (req, res) => {
  const productsLedgers = await ProductsLedger.find();
  const clients = await Client.find();
  const products = await Stock.find();
  const vendors = await Vendor.find();
  res.render("clientsledger", {
    title: "Clients-Ledger",
    productsLedgers,
    clients,
    products,
    vendors
  });
});
module.exports = router;
