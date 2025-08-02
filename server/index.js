require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const app = express();

// Middlewares
app.use(cors()); 
app.use(express.json()); 

// Test Route
app.get('/api', (req, res) => {
  res.json({ message: "Hello from the DailyOps backend! 👋" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});