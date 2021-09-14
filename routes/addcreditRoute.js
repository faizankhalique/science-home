const express = require("express");
const router = express.Router();
const { PaymentTable } = require("../models/paymentTable");
const auth = require("../middlewares/auth");
const { Client } = require("../models/client");
router.get("/", async (req, res) => {
  const clients = await Client.find();
  let clientPaymentRecords = [];
  const AllClientPayments = await PaymentTable.find();
  if (AllClientPayments.length > 0) {
    for (const clientPayment of AllClientPayments) {
      const clientPayments = await PaymentTable.find({
        clientId: clientPayment.clientId
      });
      let credit = 0;
      let debet = 0;
      let balance = 0;
      for (let index = 0; index < clientPayments.length; index++) {
        if (clientPayments[index].debt)
          debet = debet + clientPayments[index].debt;
        if (clientPayments[index].credit)
          credit = credit + clientPayments[index].credit;
      }
      balance = credit - debet;
      clientPaymentRecords.push({
        clientName: clientPayment.clientName,
        clientId: clientPayment.clientId,
        credit,
        debet,
        balance
      });
    }
  }
  const uniqueClientPaymentRecords = Array.from(
    new Set(clientPaymentRecords.map(a => a.clientId))
  ).map(id => {
    return clientPaymentRecords.find(a => a.clientId === id);
  });
  res.render("addcredit", {
    title: "Add-Credit",
    clients: clients,
    clientPaymentRecords: uniqueClientPaymentRecords
  });
});
router.post("/", auth, async (req, res) => {
  const body = req.body;
  console.log(body);
  const amount = parseInt(body.Amount);
  if (body.challanId) {
    const paymentTable = await PaymentTable.findOne({
      challanId: body.challanId
    });
    if (!paymentTable) return res.status(400).send("Invalid Challan Id");
    if (body.checkNumber) {
      const paymentTable = new PaymentTable({
        clientId: body.clientId,
        clientName: body.clientName,
        credit: amount,
        checkNumber: body.checkNumber,
        created_at: new Date(body.date).toISOString()
      });
      await paymentTable.save();
    } else {
      const paymentTable = new PaymentTable({
        clientId: body.clientId,
        clientName: body.clientName,
        credit: amount,
        created_at: new Date(body.date).toISOString()
      });
      await paymentTable.save();
    }
  } else {
    if (body.checkNumber) {
      const paymentTable = new PaymentTable({
        clientId: body.clientId,
        clientName: body.clientName,
        credit: amount,
        checkNumber: body.checkNumber,
        created_at: new Date(body.date).toISOString()
      });
      await paymentTable.save();
    } else {
      const paymentTable = new PaymentTable({
        clientId: body.clientId,
        clientName: body.clientName,
        credit: amount,
        created_at: new Date(body.date).toISOString()
      });
      const result = await paymentTable.save();
    }
  }

  res.json("Credit add successfully");
});
module.exports = router;
