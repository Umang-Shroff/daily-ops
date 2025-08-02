const express = require('express');
const Parser = require('rss-parser');
const router = express.Router();

const parser = new Parser({
  customFields: {
    item: [
      ['media:thumbnail', 'mediaThumbnail'],
      ['media:content', 'mediaContent'],
    ],
  },
});

const FEED_URL = 'https://www.wired.com/feed/rss';

router.get('/', async (req, res) => {
  try {
    const feed = await parser.parseURL(FEED_URL);

    const articles = feed.items.map(item => ({
      title: item.title,
      url: item.link,
      description: item.contentSnippet || item.description || 'No description available.',
      source: { name: feed.title || 'Wired' },
      publishedAt: item.isoDate || item.pubDate,
      imageUrl: item.mediaThumbnail?.$.url || null,
    }));
    res.json(articles);
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    res.status(500).json({ message: "Error fetching news" });
  }
});

module.exports = router;
