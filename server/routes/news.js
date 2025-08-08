const express = require("express");
const Parser = require("rss-parser");
const router = express.Router();

const parser = new Parser({
  customFields: {
    item: [
      ["media:thumbnail", "mediaThumbnail"],
      ["media:content", "mediaContent"],
    ],
  },
});

const FEED_URL = "https://www.wired.com/feed/rss";

// In-memory cache
let cache = {
  timestamp: 0,
  data: [],
};
const CACHE_TTL_MS = 1000 * 60; 

router.get("/", async (req, res) => {
  try {
    const now = Date.now();
    if (now - cache.timestamp < CACHE_TTL_MS && cache.data.length > 0) {
      // console.log("Serving from cache");
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify(cache.data));
    }

    // console.log("Fetching new RSS feed...");
    const feed = await parser.parseURL(FEED_URL);

    const articles = feed.items.map((item) => ({
      title: item.title,
      url: item.link,
      description:
        item.contentSnippet || item.description || "No description available.",
      source: { name: feed.title || "Wired" },
      publishedAt: item.isoDate || item.pubDate,
      imageUrl:
        item.mediaThumbnail?.$.url ||
        item.mediaContent?.$.url ||
        null,
    }));

    cache = {
      timestamp: now,
      data: articles,
    };

    // Stream data
    res.setHeader("Content-Type", "application/json");
    res.write("[");
    articles.forEach((article, index) => {
      res.write(JSON.stringify(article));
      if (index !== articles.length - 1) res.write(",");
    });
    res.write("]");
    res.end();

  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    res.status(500).json({ message: "Error fetching news" });
  }
});

module.exports = router;
