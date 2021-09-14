const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const _ = require("lodash");
const { ProductsLedger } = require("../models/productsLedger");
const { Stock, validateStock } = require("../models/stock");
const { Vendor } = require("../models/vendor");
router.get("/", async (req, res) => {
  const stock = await Stock.find();
  const vendors = await Vendor.find().select({
    firstName: 1,
    lastName: 1,
    userName: 1
  });
  res.render("stock", { title: "Stock", products: stock, vendors });
});
router.get("/casenumber/:casenumber", auth, async (req, res) => {
  const caseNumber = req.params.casenumber;
  const stock = await Stock.findOne({ caseNumber: caseNumber });
  if (!stock)
    return res.status(404).send("The Product with this caseNumber not found");
  res.json({ stock: stock });
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const stock = await Stock.findById(id);
  if (!stock)
    return res
      .status(404)
      .send("This Product Already Deleted\nplease refresh the page");
  res.json({ stock: stock });
});

router.post("/", auth, async (req, res) => {
  const body = req.body;
  // console.log("body", body);
  // const { error } = validateStock(body);
  // console.log(error);
  // if (error) return res.status(400).send(error.details[0].message);
  let stock = await Stock.findOne({
    caseNumber: body.caseNumber,
    unit: body.unit
  });
  if (stock)
    return res
      .status(400)
      .send(`Case-No:${body.caseNumber} and unit:${body.unit} already exist`);

  stock = new Stock(
    _.pick(body, [
      "productName",
      "brand",
      "type",
      "quantity",
      "unit",
      "purchasePrice",
      "expiryDate",
      "vendorName",
      "catNumber",
      "caseNumber"
    ])
  );
  stock.purchaseQuantity = body.quantity;
  stock.billPrice = parseInt(body.purchasePrice) * parseInt(body.quantity);
  const productsLedger = new ProductsLedger({
    productName: stock.productName,
    particulars: stock.vendorName,
    vendorName: stock.vendorName,
    recievedQuantity: stock.purchaseQuantity,
    totalBill: stock.billPrice,
    unitPrice: stock.purchasePrice,
    balance: stock.purchaseQuantity
  });
  await productsLedger.save();
  await stock.save();
  res.json({ message: "Product Add successfully" });
});
router.put("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const stock = await Stock.findById(id);
  if (!stock)
    return res
      .status(404)
      .send("This Product Already Deleted\nplease refresh the page");

  stock.productName = body.productName;
  stock.brand = body.brand;
  stock.type = body.type;
  stock.quantity = parseInt(stock.quantity) + parseInt(body.quantity);
  stock.unit = body.unit;
  stock.purchasePrice = body.purchasePrice;
  stock.expiryDate = body.expiryDate;
  stock.vendorName = body.vendorName;
  stock.catNumber = body.catNumber;
  stock.caseNumber = body.caseNumber;
  await stock.save();
  const billPrice = parseInt(body.purchasePrice) * parseInt(body.quantity);
  const productsLedger = new ProductsLedger({
    productName: body.productName,
    particulars: body.vendorName,
    vendorName: body.vendorName,
    recievedQuantity: body.quantity,
    totalBill: billPrice,
    unitPrice: body.purchasePrice,
    balance: stock.quantity
  });
  await productsLedger.save();
  res.json({ m: "Product update successfully " });
});
router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const result = await Stock.findByIdAndDelete({
    _id: id
  });
  if (!result)
    return res
      .status(404)
      .send("This Product Already Deleted\nplease refresh the page");
  res.json({ m: "Product delete Successfully" });
});
module.exports = router;
