import React, { useState } from 'react';
import { toggleLikeReview } from '../../../services/reviewService';

const ReviewItem = ({ review }) => {
  // Format ngày tháng
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric'
    });
  };
  
  // Thêm state để theo dõi nút thích
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(review.likes || 0);
  
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
  
  // Xử lý sự kiện nhấn nút thích
  const handleLike = async () => {
    try {
      const result = await toggleLikeReview(review.id);
      setLiked(result.liked);
      setLikeCount(result.likeCount);
    } catch (error) {
      console.error('Lỗi khi thích/bỏ thích:', error);
      // Có thể hiển thị thông báo lỗi
    }
  };

  return (
    <div className="p-6 border rounded-lg shadow-sm mb-4 bg-white hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{review.title}</h3>
          <div className="flex items-center mt-1">
            {renderStars(review.rating)}
            <span className="ml-2 text-sm text-gray-600">{review.rating}/5</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-gray-500 text-sm">{formatDate(review.date)}</span>
          {review.verifiedPurchase && (
            <span className="text-green-600 text-xs mt-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Đã mua xác thực
            </span>
          )}
        </div>
      </div>
      
      <p className="mt-3 text-gray-700">{review.content}</p>
      
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600 font-medium">
          Đánh giá bởi: <span className="text-blue-600">{review.customerName}</span>
        </p>
        
        <div className="flex space-x-4 items-center">
          <button 
            onClick={handleLike}
            className={`flex items-center text-sm ${liked ? 'text-blue-600' : 'text-gray-500'} hover:text-blue-600 transition-colors`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            {likeCount} Hữu ích
          </button>
          
          <button className="flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
            Bình luận
          </button>
        </div>
      </div>
      
      {review.response && (
        <div className="mt-4 p-3 bg-gray-50 rounded-md border-l-4 border-blue-500">
          <p className="text-sm font-medium text-gray-900">Phản hồi từ Cửa hàng:</p>
          <p className="mt-1 text-sm text-gray-700">{review.response}</p>
          <p className="mt-2 text-xs text-gray-500">{formatDate(review.responseDate || review.date)}</p>
        </div>
      )}
    </div>
  );
};

export default ReviewItem;