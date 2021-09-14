const express = require("express");
const router = express.Router();
const { Client } = require("../models/client");
const { ChallanBillTable } = require("../models/deliveryBill");
const { Stock } = require("../models/stock");
const auth = require("../middlewares/auth");
router.post("/getallprofit", auth, async (req, res) => {
  const body = req.body;
  const year = body.year || new Date().getFullYear();
  let allMonthProfit = [];
  let monthProfit = [];
  let l = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Nov",
    "Oct",
    "Dec"
  ];
  let labels = [];
  for (let index = 1; index <= 12; index++) {
    const bills = await ChallanBillTable.find({
      generateYear: year,
      generateMonth: index
    });
    if (bills) {
      let profit = 0;
      for (const p of bills) {
        profit = profit + p.profit;
      }
      labels.push(l[index - 1]);
      monthProfit.push(profit);
      allMonthProfit.push({ month: index, profit: profit });
    }
  }

  res.json({ labels: labels, monthProfit: monthProfit });
});
router.get("/", async (req, res) => {
  // const currentDate = new Date().toLocaleDateString();
  // const date = currentDate.split("/");
  // const day = date[1];
  // const month = date[0];
  // const year = date[2];
  // console.log(month + day + year);
  const totalClients = await Client.find().count();
  const totalDeliveryBills = await ChallanBillTable.find({
    generateDate: new Date().toISOString()
  }).count();
  const products = await Stock.find()
    .limit(5)
    .sort({ sold: -1 });
  const bills = await ChallanBillTable.find({
    generateMonth: new Date().getMonth() + 1
  });
  let profit = 0;
  for (const p of bills) {
    profit = profit + p.profit;
  }

  res.render("index", {
    title: "index",
    totalClients: totalClients,
    totalDeliveryBills: totalDeliveryBills,
    products: products,
    monthlyRevenu: profit
  });
});
module.exports = router;
