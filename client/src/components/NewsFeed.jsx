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

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Headlines</h1>
      </div>

      {loading && articles.length === 0 ? (
        <p className="text-gray-400">Loading tech news...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <a href={article.url} key={index} target="_blank" rel="noopener noreferrer" className="block bg-slate-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-sky-500 transition-all duration-200">
              {/* Conditionally render image if it exists */}
              {article.imageUrl && (
                <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover" />
              )}

              <div className="p-4">
                <h2 className="text-lg font-semibold text-white">{article.title}</h2>
                <p className="text-gray-400 mt-2 text-sm">{article.description}</p>
                <p className="text-xs text-gray-500 mt-3">{article.source.name} &bull; {new Date(article.publishedAt).toLocaleDateString()}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsFeed;