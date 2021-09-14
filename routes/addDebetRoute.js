const express = require("express");
const router = express.Router();
const { AddDebet } = require("../models/addDebet");
const auth = require("../middlewares/auth");
const { Vendor } = require("../models/vendor");
const { ProductsLedger } = require("../models/productsLedger");
router.get("/", async (req, res) => {
  const vendors = await Vendor.find();
  let vendorPaymentRecords = [];
  const AllVendorPayments = await AddDebet.find();
  // console.log(AllVendorPayments);
  if (AllVendorPayments.length > 0) {
    for (const vendorPayment of AllVendorPayments) {
      const vendorPayments = await AddDebet.find({
        vendorId: vendorPayment.vendorId
      });
      let credit = 0;
      let debet = 0;
      let balance = 0;
      for (let index = 0; index < vendorPayments.length; index++) {
        if (vendorPayments[index].debet)
          debet = debet + vendorPayments[index].debet;
        if (vendorPayments[index].credit)
          credit = credit + vendorPayments[index].credit;
      }
      balance = credit - debet;
      vendorPaymentRecords.push({
        vendorName: vendorPayment.vendorName,
        vendorId: vendorPayment.vendorId,
        credit,
        debet,
        balance
      });
    }
  }

  const uniqueVendorPaymentRecords = Array.from(
    new Set(vendorPaymentRecords.map(a => a.vendorId))
  ).map(id => {
    return vendorPaymentRecords.find(a => a.vendorId === id);
  });
  res.render("addDebet", {
    title: "Add-Debet",
    vendors: vendors,
    vendorPaymentRecords: uniqueVendorPaymentRecords
  });
});
router.post("/", auth, async (req, res) => {
  const body = req.body;
  const addDebet = new AddDebet({
    vendorId: body.vendorId,
    vendorName: body.vendorName,
    debet: body.Amount,
    created_at: new Date(body.date).toISOString()
  });
  await addDebet.save();
  const un = body.vendorName.split("[");
  const vendorUserName = un[1].split("]");
  const productsLedger = new ProductsLedger({
    vendorName: vendorUserName[0],
    debet: body.Amount,
    date: new Date(body.date).toISOString()
  });
  await productsLedger.save();
  res.json("Credit add successfully");
});
module.exports = router;
