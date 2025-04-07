import React, { useState, useEffect } from 'react';
import ReviewFilter from '../../components/admin/review/ReviewFilter';
import ReviewList from '../../components/admin/review/ReviewList';
import ReviewSummary from '../../components/admin/review/ReviewSummary';
import reviewService from '../../services/reviewService';

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    rating: 0,
    sortBy: 'newest',
    searchTerm: '',
    dateRange: { start: '', end: '' }
  });
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [reviews, filters]);

  const fetchReviews = () => {
    setIsLoading(true);
    const data = reviewService.getAllReviews();
    setReviews(data);
    setFilteredReviews(data);
    setIsLoading(false);
  };

  const applyFilters = () => {
    let result = [...reviews];

    if (filters.rating > 0) {
      result = result.filter(review => review.rating === filters.rating);
    }

    if (filters.searchTerm) {
      const search = filters.searchTerm.toLowerCase();
      result = result.filter(review => 
        review.customerName.toLowerCase().includes(search) ||
        review.content.toLowerCase().includes(search) ||
        (review.title && review.title.toLowerCase().includes(search))
      );
    }

    if (filters.dateRange.start && filters.dateRange.end) {
      const start = new Date(filters.dateRange.start);
      const end = new Date(filters.dateRange.end);
      end.setHours(23, 59, 59);
      
      result = result.filter(review => {
        const date = new Date(review.date);
        return date >= start && date <= end;
      });
    }

    switch (filters.sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'highest':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest':
        result.sort((a, b) => a.rating - b.rating);
        break;
    }

    setFilteredReviews(result);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleViewReview = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  if (isLoading) return <div className="text-center p-4">Đang tải...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Quản lý đánh giá</h1>
      
      <ReviewSummary reviews={reviews} />
      
      <ReviewFilter 
        filters={filters} 
        onFilterChange={handleFilterChange} 
      />
      
      <ReviewList 
        reviews={filteredReviews}
        onViewReview={handleViewReview}
      />
      
      {isModalOpen && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">{selectedReview.title || 'Không có tiêu đề'}</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-500">Khách hàng: {selectedReview.customerName}</p>
              <p className="text-sm text-gray-500">
                Ngày: {new Date(selectedReview.date).toLocaleDateString('vi-VN')}
              </p>
            </div>
            
            <div className="mb-4 flex items-center">
              <span className="mr-2">Đánh giá: {selectedReview.rating}/5</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= selectedReview.rating ? 'text-yellow-400' : 'text-gray-300'}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <p className="font-medium mb-2">Nội dung:</p>
              <div className="bg-gray-50 p-4 rounded">
                {selectedReview.content}
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewManagement;