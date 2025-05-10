const Parser = require('rss-parser');
const parser = new Parser();

const HURRIYET_GUNDEM_RSS = 'https://www.hurriyet.com.tr/rss/gundem';

async function fetchHurriyetRSS() {
  try {
    const feed = await parser.parseURL(HURRIYET_GUNDEM_RSS);
    const news = feed.items.map(item => ({
      title: item.title,
      summary: item.contentSnippet,
      url: item.link,
      imageUrl: item.enclosure?.url || null,
      category: 'gundem',
      publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
    }));

    console.log(news);
    return news;
  } catch (err) {
    console.error('RSS çekme hatası:', err.message);
    return [];
  }
}

fetchHurriyetRSS();
