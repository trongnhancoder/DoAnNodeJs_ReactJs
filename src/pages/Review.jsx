import { useState } from 'react';
import { reviewData } from '../data/reviewData.js';
import ReviewCard from '../components/ReviewCard.jsx';

function Review() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Đánh giá khách hàng</h1>

        {!isLoggedIn ? (
          <div className="text-center">
            <p className="text-gray-700 mb-4">Bạn cần đăng nhập để xem và gửi đánh giá.</p>
            <button
              onClick={handleLogin}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Đăng nhập
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {reviewData.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Review;