const express = require("express");
const router = express.Router();
const { ChallanBillTable } = require("../models/deliveryBill");
const { InvoiceBillTable } = require("../models/invoiceBill");
const { PaymentTable } = require("../models/paymentTable");
const { Client } = require("../models/client");
const auth = require("../middlewares/auth");
router.get("/", async (req, res) => {
  const deliveryBill = await ChallanBillTable.find();
  const invoiceBill = await InvoiceBillTable.find();
  // console.log(deliveryBill);
  res.render("delivery_invoice", {
    title: "Delivery_Invoice",
    deliveryBill: deliveryBill,
    invoiceBill: invoiceBill
  });
});
router.get("/deliverytablerows/:id", auth, async (req, res) => {
  const id = req.params.id;
  const deliveryBill = await ChallanBillTable.findById(id);
  const client = await Client.findOne({ clientId: deliveryBill.clientId });
  // console.log(client);
  if (!deliveryBill) return res.status(404).send("bill not found");
  const rows = [];
  for (const row of deliveryBill.rows) {
    rows.push(row);
  }

  //  = deliveryBill.rows;
  res.json({
    rows: rows,
    client: client,
    challanId: deliveryBill.challanId,
    date: deliveryBill.generateDate
  });
});
router.get("/invoicetablerows/:id", auth, async (req, res) => {
  const id = req.params.id;

  const invoiceBill = await InvoiceBillTable.findById(id);
  if (!invoiceBill) return res.status(404).send("bill not found");
  const client = await Client.findOne({ clientId: invoiceBill.clientId });
  const rows = [];
  for (const row of invoiceBill.rows) {
    rows.push(row);
  }

  //  = deliveryBill.rows;
  res.json({
    rows: rows,
    client: client,
    challanId: invoiceBill.challanId,
    date: invoiceBill.generateDate
  });
});
router.get("/clientdata/:clientid", auth, async (req, res) => {
  const clientId = req.params.clientid;
  let clientData = [];
  const paymentRecords = await ChallanBillTable.find({ clientId: clientId });
  if (!paymentRecords) return res.status(404).send("not found");
  for (const paymentRecord of paymentRecords) {
    const challanId = paymentRecord.challanId;
    const paymentTables = await PaymentTable.find({ challanId: challanId });
    if (paymentTables.length > 0) {
      for (const paymentTable of paymentTables) {
        clientData.push({
          date: paymentRecord.generateDate,
          billTotal: paymentRecord.total,
          credit: paymentTable.credit,
          debet: paymentTable.debt,
          challanId: challanId
        });
      }
    }
  }
  const paymentTables2 = await PaymentTable.find({
    clientId: clientId,
    challanId: { $exists: false },
    debt: { $exists: false }
  });
  if (paymentTables2.length > 0) {
    for (const paymentTable2 of paymentTables2) {
      clientData.push({
        date: paymentTable2.created_at,
        credit: paymentTable2.credit
      });
    }
  }
  let totalCredit = 0;
  let totalDebet = 0;
  for (const client of clientData) {
    if (client.credit) totalCredit = totalCredit + client.credit;
    if (client.debet) totalDebet = totalDebet + client.debet;
  }
  res.json({ clientData: clientData, totalCredit, totalDebet });
});
router.get("/deliverybill/:challanid", auth, async (req, res) => {
  const challanId = req.params.challanid;
  const deliveryBill = await ChallanBillTable.findOne({ challanId: challanId });
  if (!deliveryBill) return res.status(404).send("bill not found");
  const rows = [];
  for (const row of deliveryBill.rows) {
    rows.push(row);
  }
  res.json({ rows: rows });
});
module.exports = router;
