const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./lib/db');
const News = require('./models/News');
const cors = require('cors'); // 🔥 burası eklenecek

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB'ye bağlan
connectDB();


app.use(cors()); // 🔥 burası da
// API route
app.get('/api/news', async (req, res) => {
  try {
    const { category, from, to } = req.query;

    // Sorgu nesnesi oluştur
    let query = {};

    if (category) {
      query.category = category;
    }

    if (from || to) {
      query.publishedAt = {};
      if (from) query.publishedAt.$gte = new Date(from);
      if (to) query.publishedAt.$lte = new Date(to);
    }

    const news = await News.find(query).sort({ publishedAt: -1 }).limit(100);

    res.json(news);
  } catch (err) {
    console.error('API hatası:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`✅ API sunucusu çalışıyor: http://localhost:${PORT}`);
});
