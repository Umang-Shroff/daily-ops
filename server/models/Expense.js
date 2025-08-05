const mongoose = require("mongoose");

const expenseEntrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true }
});

const expenseSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    entries: [expenseEntrySchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
