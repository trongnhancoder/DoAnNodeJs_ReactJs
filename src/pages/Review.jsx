import { reviewData } from '../data/reviewData.js';
import ReviewCard from '../components/ReviewCard.jsx';

function Review() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Đánh giá khách hàng</h1>
        <div className="space-y-6">
          {reviewData.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Review;