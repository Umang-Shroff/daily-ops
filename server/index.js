require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

// Importing routes
const newsRoutes = require("./routes/news");
const notesRoutes = require("./routes/notes");
const expensesRoutes = require("./routes/expenses");

const app = express();

const allowedOrigins = [
  "https://daily-ops-gamma.vercel.app", // your production frontend
  "http://localhost:5173"   // dev frontend
];
// Middlewares
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.disable("x-powered-by");
app.use(express.json());

// Routes
app.use("/api/news", newsRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/expenses", expensesRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

// Test Route
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to DailyOps!" });
});
