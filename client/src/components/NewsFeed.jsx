import { useState, useEffect } from 'react';
import axios from 'axios';
import { RefreshCw } from 'lucide-react';

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/news');
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch news only on the initial component mount
  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Top Headlines</h1>
        <button
          onClick={fetchNews}
          disabled={loading}
          className="p-2 text-white bg-slate-700 rounded-full hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {loading && articles.length === 0 ? (
        <p className="text-gray-400">Loading news...</p>
      ) : (
        <div className="space-y-4">
          {articles.map((article, index) => (
            <a href={article.url} key={index} target="_blank" rel="noopener noreferrer" className="block p-4 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-200">
              <h2 className="text-xl font-semibold text-white">{article.title}</h2>
              <p className="text-gray-400 mt-2">{article.description}</p>
              <p className="text-xs text-gray-500 mt-3">{article.source.name} &bull; {new Date(article.publishedAt).toLocaleDateString()}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsFeed;