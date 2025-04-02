import React, { useState, useEffect } from 'react';
import { reviewsMockData } from '../../services/reviewService';

const CustomerReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Load dữ liệu mẫu
  useEffect(() => {
    setTimeout(() => {
      setReviews(reviewsMockData);
      setLoading(false);
    }, 800); // Giả lập thời gian tải
  }, []);
  
  // Format ngày tháng
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric'
    });
  };
  
  // Render các ngôi sao đánh giá
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
    <div className="bg-gray-50 min-h-screen">
      {/* Header section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold">Đánh giá của khách hàng</h1>
          <p className="text-lg mt-2">Xem các đánh giá về dịch vụ của chúng tôi</p>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Tất cả đánh giá</h2>
          </div>
          
          {loading ? (
            <div className="p-6 text-center">
              <div className="inline-block animate-spin rounded-full border-4 border-indigo-600 border-solid border-t-transparent h-12 w-12 mb-4"></div>
              <p className="text-gray-600">Đang tải đánh giá...</p>
            </div>
          ) : (
            <div>
              {reviews.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-gray-600">Chưa có đánh giá nào.</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {reviews.map((review) => (
                    <li key={review.id} className="p-6">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium text-gray-900">{review.title}</h3>
                        <span className="text-gray-600 text-sm">{formatDate(review.date)}</span>
                      </div>
                      
                      <div className="flex items-center mt-1">
                        {renderStars(review.rating)}
                        <span className="ml-2 text-sm text-gray-600">{review.rating}/5</span>
                      </div>
                      
                      <p className="mt-3 text-gray-700">{review.content}</p>
                      
                      <p className="mt-2 text-sm text-gray-600">Đánh giá bởi: {review.customerName}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerReview; 