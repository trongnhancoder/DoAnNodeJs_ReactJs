import React, { useState, useEffect } from 'react';
import ReviewItem from '../../Review/ReviewItem';
import ReviewFilter from '../../Review/ReviewFilter';
import ReviewSummary from './ReviewSummary';
import ReviewPagination from './ReviewPagination';

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    rating: 0,
    sortBy: 'newest',
  });

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        // Thay thế URL này bằng API thực tế của bạn
        const response = await fetch(`/api/products/${productId}/reviews?page=${currentPage}&rating=${filters.rating}&sortBy=${filters.sortBy}`);
        
        if (!response.ok) {
          throw new Error('Không thể tải đánh giá');
        }
        
        const data = await response.json();
        setReviews(data.reviews);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId, currentPage, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi bộ lọc
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && reviews.length === 0) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-md">
        <p>Đã xảy ra lỗi: {error}</p>
        <button 
          className="mt-2 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
          onClick={() => window.location.reload()}
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Đánh giá từ khách hàng</h2>
      
      <ReviewSummary productId={productId} />
      
      <div className="my-6">
        <ReviewFilter filters={filters} onFilterChange={handleFilterChange} />
      </div>
      
      {reviews.length === 0 ? (
        <div className="p-8 text-center bg-gray-50 rounded-md">
          <p className="text-gray-500">Chưa có đánh giá nào cho sản phẩm này.</p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Viết đánh giá đầu tiên
          </button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-sm border">
            {reviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </div>
          
          <div className="mt-6">
            <ReviewPagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewList; 