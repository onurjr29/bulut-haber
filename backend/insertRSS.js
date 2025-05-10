const connectDB = require('./lib/db');
const News = require('./models/News');
const Parser = require('rss-parser');
const parser = new Parser();

async function fetchRSS(url, category) {
  try {
    const feed = await parser.parseURL(url);
    const newsItems = feed.items.map(item => ({
      title: item.title,
      summary: item.contentSnippet,
      url: item.link,
      imageUrl: item.enclosure?.url || '',
      category,
      publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
    }));
    await News.insertMany(newsItems);
    console.log(`✅ ${category} kategorisinden ${newsItems.length} haber kaydedildi.`);
  } catch (err) {
    console.error(`❌ ${category} RSS çekme hatası:`, err.message);
  }
}

async function main() {
  await connectDB();

  await fetchRSS('https://www.hurriyet.com.tr/rss/gundem', 'gundem');
  await fetchRSS('https://www.hurriyet.com.tr/rss/ekonomi', 'ekonomi');
  await fetchRSS('https://shiftdelete.net/feed', 'teknoloji');

  console.log('🚀 Tüm kategorilerden RSS verileri çekildi ve kaydedildi.');
}

main();
