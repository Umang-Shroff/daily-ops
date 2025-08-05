import { useState, useEffect } from "react";
import axios from "axios";
import { RefreshCw } from "lucide-react";

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/news");
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen text-[#1a1a1a] px-4 py-6 md:px-12 lg:px-20 font-sans">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#2b2b2b]">
          Headlines
        </h1>
        <button
          onClick={() => {
            window.location.reload();
          }}
          className="flex items-center gap-2 cursor-pointer text-sm bg-[#fff6f1] hover:bg-[#fff5ec] hover:shadow-lg border border-[#dad6d0] text-[#333] px-4 py-2 rounded-xl transition-all duration-300 shadow-md"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {loading && articles.length === 0 ? (
        <p className="text-gray-500 text-center">Loading tech news...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <a
              href={article.url}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl shadow-md border border-[#e0deda] overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {article.imageUrl && (
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
              )}

              <div className="p-5">
                <h2 className="text-xl font-semibold text-[#222] leading-snug mb-2 hover:text-[#8833dc] transition-colors duration-200">
                  {article.title}
                </h2>
                <p className="text-sm text-[#666] leading-relaxed line-clamp-3">
                  {article.description}
                </p>
                <p className="text-xs text-[#999] mt-4">
                  {article.source.name} &bull;{" "}
                  {new Date(article.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
