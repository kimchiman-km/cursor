import { useState } from 'react';
import toast from 'react-hot-toast';

const MemeCard = ({ meme }) => {
  const [copying, setCopying] = useState(false);

  const copyImageToClipboard = async () => {
    try {
      setCopying(true);
      const response = await fetch(meme.imageUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      toast.success('이미지가 클립보드에 복사되었습니다!');
    } catch (error) {
      console.error('이미지 복사 중 오류 발생:', error);
      toast.error('이미지 복사에 실패했습니다.');
    } finally {
      setCopying(false);
    }
  };

  const downloadImage = async () => {
    try {
      const response = await fetch(meme.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${meme.title}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('이미지 다운로드 중 오류 발생:', error);
      toast.error('이미지 다운로드에 실패했습니다.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative aspect-square">
        <img
          src={meme.imageUrl}
          alt={meme.title}
          className="w-full h-full object-cover cursor-pointer"
          onClick={copyImageToClipboard}
        />
        <div className="absolute top-2 right-2 space-x-2">
          <button
            onClick={downloadImage}
            className="btn btn-secondary p-2 rounded-full"
            title="다운로드"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{meme.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{meme.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{meme.source}</span>
          <span>{new Date(meme.uploadDate).toLocaleDateString()}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {meme.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemeCard; 