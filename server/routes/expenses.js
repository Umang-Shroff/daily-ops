const express = require("express");
const Expense = require("../models/Expense");
const dayjs = require("dayjs");
const moment = require("moment");
const router = express.Router();

// GET today's expenses
router.get("/today", async (req, res) => {
  try {
    const today = moment().format("YYYY-MM-DD");

    const expenses = await Expense.find({ date: today });
    console.log("Fetching today's date:", today);
    res.status(200).json(expenses);
  } catch (err) {
    console.error("Error in /today route:", err);
    res.status(500).json({ message: "Failed to fetch today's expenses" });
  }
});

// POST new expense for today
router.post("/", async (req, res) => {
  const today = dayjs().format("YYYY-MM-DD");
  const { title, price } = req.body;

  if (!title || !price) {
    return res.status(400).json({ message: "Title and price are required" });
  }

  try {
    let doc = await Expense.findOne({ date: today });

    if (!doc) {
      // First entry today
      doc = new Expense({
        date: today,
        entries: [{ title, price }]
      });
    } else {
      const existingEntry = doc.entries.find((entry) => entry.title === title);

      if (existingEntry) {
        existingEntry.price += price;
      } else {
        doc.entries.push({ title, price });
      }
    }

    await doc.save();
    res.status(200).json(doc.entries);
  } catch (err) {
    res.status(500).json({ message: "Failed to save expense" });
  }
});

router.delete("/:title", async (req, res) => {
  const today = moment().format("YYYY-MM-DD");
  const { title } = req.params;

  try {
    const doc = await Expense.findOne({ date: today });

    if (!doc) return res.status(404).json({ message: "No entry for today." });

    // Remove entry with matching title
    doc.entries = doc.entries.filter(entry => entry.title !== title);

    await doc.save();

    res.status(200).json({ message: "Entry deleted", entries: doc.entries });
  } catch (err) {
    console.error("Error deleting entry:", err);
    res.status(500).json({ message: "Failed to delete entry" });
  }
});

// Get all expenses grouped by date (current month only)
router.get("/ledger", async (req, res) => {
  try {
    const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");

    const expenses = await Expense.find({
      date: { $gte: startOfMonth }
    });

    const grouped = {};

    expenses.forEach((doc) => {
      const dateKey = doc.date;

      if (!grouped[dateKey]) {
        grouped[dateKey] = {
          total: 0,
          categories: [],
        };
      }

      doc.entries.forEach((entry) => {
        grouped[dateKey].categories.push({
          title: entry.title,
          price: entry.price
        });

        grouped[dateKey].total += entry.price;
      });
    });

    console.log("Fetched ledger for current month", grouped);
    res.status(200).json(grouped);
  } catch (err) {
    console.error("Error in /ledger route:", err);
    res.status(500).json({ message: "Failed to fetch ledger." });
  }
});


// Delete all expenses not from the current month
router.delete("/cleanup", async (req, res) => {
  try {
    const currentMonth = moment().format("YYYY-MM");

    const result = await Expense.deleteMany({
      date: { $not: { $regex: `^${currentMonth}` } },
    });
    console.log("Cleaning up. Keeping month:", currentMonth);

    res.status(200).json({ deleted: result.deletedCount });
  } catch (err) {
    console.error("Error cleaning up old data:", err);
    res.status(500).json({ message: "Failed to cleanup old entries" });
  }
});

module.exports = router;

