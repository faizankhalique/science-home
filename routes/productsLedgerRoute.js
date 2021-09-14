const express = require("express");
const router = express.Router();
const { ProductsLedger } = require("../models/productsLedger");
const { Client } = require("../models/client");
const { Stock } = require("../models/stock");
const { Vendor } = require("../models/vendor");
const auth = require("../middlewares/auth");
router.get("/", async (req, res) => {
  const productsLedgers = await ProductsLedger.find();
  const clients = await Client.find();
  const products = await Stock.find();
  const vendors = await Vendor.find();
  res.render("productsledger", {
    title: "Products-Ledger",
    productsLedgers,
    clients,
    products,
    vendors
  });
});
router.get("/productname/:productname", auth, async (req, res) => {
  const productName = req.params.productname;
  const productsLedgers = await ProductsLedger.find({ productName });
  if (productsLedgers.length == 0)
    res.status(404).send("Product with this name  not purchase and sale");
  res.json({ productsLedgers: productsLedgers });
});
router.get("/vendorname/:vendorname", auth, async (req, res) => {
  const vendorName = req.params.vendorname;
  const productsLedgers = await ProductsLedger.find({ vendorName });
  if (productsLedgers.length == 0) res.status(404).send("Not found");

  res.json({ productsLedgers: productsLedgers });
});
router.get("/clientname/:clientname", async (req, res) => {
  const clientName = req.params.clientname;
  const productsLedgers = await ProductsLedger.find({ clientName });
  if (productsLedgers.length == 0) res.status(404).send("Not found");
  res.json({ productsLedgers: productsLedgers });
});
module.exports = router;
