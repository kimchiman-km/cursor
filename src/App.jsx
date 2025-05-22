import { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import MemeCard from './components/MemeCard';
import SearchBar from './components/SearchBar';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

function App() {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async (searchQuery = '') => {
    try {
      setLoading(true);
      setError(null);
      const endpoint = searchQuery
        ? `${API_BASE_URL}/memes/search?q=${encodeURIComponent(searchQuery)}`
        : `${API_BASE_URL}/memes`;
      
      const response = await axios.get(endpoint);
      setMemes(searchQuery ? response.data.memes : response.data.memes);
    } catch (error) {
      console.error('밈 데이터 로딩 중 오류 발생:', error);
      setError('밈 데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    fetchMemes(query);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">오늘의 드립</h1>
          <p className="text-gray-600">
            국내 최고의 밈/짤 아카이브 - 클릭 한 번으로 복사하세요!
          </p>
        </header>

        <SearchBar onSearch={handleSearch} />

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">{error}</div>
        ) : memes.length === 0 ? (
          <div className="text-center py-12 text-gray-600">
            검색 결과가 없습니다.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {memes.map((meme) => (
              <MemeCard key={meme.id} meme={meme} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
