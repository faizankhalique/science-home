const mongoose = require("mongoose");
const expenseSchema = new mongoose.Schema({
  description: {
    type: String
  },
  expenses: {
    type: Number
  },
  created_at: {
    type: Date
  }
});
const Expense = mongoose.model("Expense", expenseSchema);
module.exports.Expense = Expense;
