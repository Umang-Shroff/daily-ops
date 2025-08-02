const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.NEWS_API_KEY}`
    );
    console.log("Fetched news articles:", response.data.articles.length, "articles found.");
    res.json(response.data.articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching news" });
  }
});

module.exports = router;