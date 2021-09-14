const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { Expense } = require("../models/expenses");
router.get("/", async (req, res) => {
  const expenses = await Expense.find();
  res.render("addExpenses", {
    title: "Add-Expenses",
    expenses: expenses
  });
});
router.post("/", auth, async (req, res) => {
  const body = req.body;
  const expense = new Expense({
    description: body.description,
    expenses: body.Amount,
    created_at: body.date
  });
  await expense.save();

  res.json("Expenses add successfully");
});
module.exports = router;
