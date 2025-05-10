const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: String,
  summary: String,
  url: String,
  imageUrl: String,
  category: String,
  publishedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('News', NewsSchema);
