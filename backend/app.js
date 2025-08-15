const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

app.get('/api/news', async (req, res) => {
  try {
    const { q } = req.query;
    console.log('Search query received:', q);

    let url = '';
    let params = {
      apiKey: process.env.NEWS_API_KEY,
      pageSize: 20,
    };

    if (q) {
      // Use 'everything' endpoint for searches
      url = 'https://newsapi.org/v2/everything';
      params.q = q;
      params.sortBy = 'relevancy'; // optional
      params.language = 'en';      // optional
    } else {
      // Default top headlines for no search
      url = 'https://newsapi.org/v2/top-headlines';
      params.country = 'us';
    }

    const response = await axios.get(url, { params });
    res.json(response.data);

  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
