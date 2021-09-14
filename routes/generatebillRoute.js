const express = require("express");
const auth = require("../middlewares/auth");
const { Stock, validateStock } = require("../models/stock");
const { InvoiceBillTable } = require("../models/invoiceBill");
const { ChallanBillTable } = require("../models/deliveryBill");
const { PaymentTable } = require("../models/paymentTable");
const { Client } = require("../models/client");
const { ProductsLedger } = require("../models/productsLedger");
const router = express.Router();
router.get("/", async (req, res) => {
  const stock = await Stock.find({ quantity: { $gt: 0 } });
  const clients = await Client.find();
  res.render("generatebill", {
    title: "Generate-Bill",
    products: stock,
    clients: clients
  });
});
// <-------------------------------------------------------------------->

router.post("/", auth, async (req, res) => {
  const body = req.body;
  const clientId = body.clientId;
  const rows = [];
  for (const row of body.billTableData) {
    rows.push(row);
  }
  const invoiceBillTable = new InvoiceBillTable({
    rows: rows,
    total: body.total,
    clientId: clientId,
    clientName: body.clientName,
    generateDate: new Date().toISOString()
  });
  await invoiceBillTable.save();
  res.json("Invoice Bill Save successfuly");
});
// <-------------------------------------------------------------------->

router.put("/", auth, async (req, res) => {
  const body = req.body;
  const payment = body.payment;
  let credit = parseFloat(payment);
  let challanId = body.challanId;
  let clientId = body.clientId;
  let profit = 0;
  const rows = [];
  // console.log(body);
  for (const product of body.products) {
    //update for stock quantity
    let id = product.id;
    id.trim();
    let stock = await Stock.findById(id);
    if (!stock)
      return res
        .status(404)
        .send("Product with this id not found Please Refresh Page ");
    stock.quantity = stock.quantity - product.quantity;
    stock.sold = parseInt(stock.sold) + parseInt(product.quantity);
    stock.soldDate = new Date().toISOString();
    if (product.price >= stock.purchasePrice) {
      stock.profit = stock.profit + (product.price - stock.purchasePrice);
      profit = profit + (product.price - stock.purchasePrice);
    }
    // <---------------------------->
    const un = body.clientName.split("[");
    const clientUserName = un[1].split("]");
    // <------------------------------->
    const productsLedger = new ProductsLedger({
      productName: stock.productName,
      particulars: clientUserName[0],
      unitPrice: stock.purchasePrice,
      // vendorName: stock.vendorName,
      clientName: clientUserName[0],
      // recievedQuantity: stock.purchaseQuantity,
      issuedQuantity: product.quantity,
      balance: stock.quantity
    });
    await productsLedger.save();

    await stock.save();
  }
  for (const row of body.billTableData) {
    rows.push(row);
  }
  const challanBillTable = new ChallanBillTable({
    rows: rows,
    total: body.total,
    clientId: clientId,
    clientName: body.clientName,
    challanId: challanId,
    profit: profit,
    generateDate: new Date().toISOString(),
    generateMonth: new Date().getMonth() + 1,
    generateYear: new Date().getFullYear()
  });
  const result = await challanBillTable.save();
  if (credit && credit > 0) {
    const paymentTable1 = new PaymentTable({
      clientId: clientId,
      challanId: challanId,
      credit: credit,
      clientName: body.clientName
    });
    await paymentTable1.save();
    const paymentTable2 = new PaymentTable({
      clientId: clientId,
      challanId: challanId,
      debt: parseFloat(req.body.total),
      clientName: body.clientName
    });
    await paymentTable2.save();
  } else {
    const paymentTable = new PaymentTable({
      clientId: clientId,
      challanId: challanId,
      debt: parseFloat(req.body.total),
      clientName: body.clientName
    });
    await paymentTable.save();
  }

  res.json("Delivery Challan Save successfuly");
});
router.get("/challanid", async (req, res) => {
  let challanIds = await PaymentTable.find()
    .select({ challanId: 1, _id: 0 })
    .sort({ challanId: -1 });
  if (challanIds.length == 0) {
    const challanId = Math.floor(Math.random() * 3000);
    res.json({ challanId: challanId });
  } else {
    const challanId = parseInt(challanIds[0].challanId) + 1;
    res.json({ challanId: challanId });
  }
});
// router.put("/:id", async (req, res) => {
//   const id = req.params.id;
//   let stock = await Stock.findById(id);
//   console.log(stock);
//   if (!stock) return res.status(404).send("Product with this id not found");
//   res.json("uptade Successfully");
// });
module.exports = router;
