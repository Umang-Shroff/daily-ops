require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

// Importing routes
const newsRoutes = require('./routes/news');
const notesRoutes = require('./routes/notes')

const app = express();
// Middlewares
app.use(cors()); 
app.use(express.json()); 

// Routes
app.use('/api/news', newsRoutes);
app.use('/api/notes',notesRoutes);

// Test Route
app.get('/api', (req, res) => {
  res.json({ message: "Welcome to DailyOps!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});