import React, { useState, useEffect } from 'react';

const ReviewSummary = ({ productId }) => {
  const [summary, setSummary] = useState({
    averageRating: 0,
    totalReviews: 0,
    ratingCounts: [0, 0, 0, 0, 0] // Số lượng đánh giá cho mỗi mức sao (1-5)
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        // Thay thế URL này bằng API thực tế của bạn
        const response = await fetch(`/api/products/${productId}/reviews/summary`);
        if (!response.ok) {
          throw new Error('Không thể tải thông tin tổng hợp');
        }
        const data = await response.json();
        setSummary(data);
      } catch (error) {
        console.error('Lỗi khi tải thông tin tổng hợp:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [productId]);

  if (loading) {
    return (
      <div className="h-40 flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-5 h-5"
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" 
              />
            </svg>
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-xl font-semibold mb-4">Tổng quan đánh giá</h3>
      
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col items-center justify-center p-4 md:w-1/3">
          <div className="text-5xl font-bold text-gray-900">{summary.averageRating.toFixed(1)}</div>
          <div className="mt-2">{renderStars(Math.round(summary.averageRating))}</div>
          <div className="mt-2 text-sm text-gray-500">{summary.totalReviews} đánh giá</div>
        </div>
        
        <div className="md:w-2/3 p-4">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = summary.ratingCounts[5 - star];
            const percentage = summary.totalReviews > 0 
              ? (count / summary.totalReviews) * 100 
              : 0;
              
            return (
              <div key={star} className="flex items-center mb-2">
                <div className="w-12 text-sm text-gray-700">{star} sao</div>
                <div className="flex-1 mx-4 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400 rounded-full" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="w-12 text-sm text-right text-gray-700">
                  {count} ({percentage.toFixed(0)}%)
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="mt-4 flex justify-center md:justify-end">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-md transition-colors">
          Viết đánh giá
        </button>
      </div>
    </div>
  );
};

export default ReviewSummary; 