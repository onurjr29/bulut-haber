'use client';

import { useEffect, useState } from 'react';

type NewsItem = {
  _id: string;
  title: string;
  summary: string;
  url: string;
  imageUrl?: string;
  category: string;
  publishedAt: string;
};

export default function HomePage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [category, setCategory] = useState('gundem');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const fetchNews = async () => {
    try {
      const params = new URLSearchParams({ category });
      if (fromDate) params.append('from', fromDate);
      if (toDate) params.append('to', toDate);

      const res = await fetch(`http://localhost:5000/api/news?${params}`);
      const data = await res.json();
      setNews(data);
    } catch (error) {
      console.error('Haber çekilemedi:', error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [category, fromDate, toDate]);

  return (
    <main className="min-h-screen bg-gray-100 p-6 text-black">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">Bulut Haber Platformu</h1>

      <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="gundem">Gündem</option>
          <option value="ekonomi">Ekonomi</option>
          <option value="teknoloji">Teknoloji</option>
        </select>

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="p-2 border rounded text-black"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <div key={item._id} className="bg-white rounded shadow p-4">
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-40 object-cover rounded mb-4"
              />
            )}
            <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-600 text-sm mb-4">{item.summary}</p>
            <p className="text-gray-400 text-xs mb-2">
              {new Date(item.publishedAt).toLocaleDateString('tr-TR')}
            </p>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm underline"
            >
              Haberi Oku
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
