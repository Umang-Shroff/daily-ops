import express from "express";
import Expense from "../models/Expense.js";
import dayjs from "dayjs";
const router = express.Router();

// GET today's expenses
router.get("/today", async (req, res) => {
  const today = dayjs().format("YYYY-MM-DD");

  try {
    const existing = await Expense.findOne({ date: today });
    res.status(200).json(existing ? existing.entries : []);
  } catch (err) {
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

export default router;
