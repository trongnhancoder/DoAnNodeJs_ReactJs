import React, { useState } from 'react';
import { addReview } from '../../../services/reviewService';

const AddReviewForm = ({ productId, onSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    content: '',
    customerName: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingChange = (newRating) => {
    setFormData({ ...formData, rating: newRating });
    if (errors.rating) {
      setErrors({ ...errors, rating: null });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.rating === 0) {
      newErrors.rating = 'Vui lòng chọn số sao đánh giá';
    }
    
    if (!formData.title.trim()) {
      newErrors.title = 'Vui lòng nhập tiêu đề đánh giá';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Vui lòng nhập nội dung đánh giá';
    } else if (formData.content.length < 10) {
      newErrors.content = 'Nội dung đánh giá phải có ít nhất 10 ký tự';
    }
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Vui lòng nhập tên của bạn';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Sử dụng service thay vì gọi fetch trực tiếp
      await addReview({
        productId,
        ...formData
      });
      
      // Gọi callback khi thành công
      onSuccess();
      
    } catch (error) {
      setErrors({ ...errors, submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Viết đánh giá của bạn</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Đánh giá sao</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingChange(star)}
                className="text-3xl focus:outline-none"
              >
                <span className={star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}>
                  ★
                </span>
              </button>
            ))}
          </div>
          {errors.rating && <p className="mt-1 text-red-500 text-sm">{errors.rating}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Tiêu đề đánh giá
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tóm tắt trải nghiệm của bạn"
          />
          {errors.title && <p className="mt-1 text-red-500 text-sm">{errors.title}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
            Nội dung đánh giá
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows="5"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Chia sẻ chi tiết về trải nghiệm của bạn với sản phẩm này"
          ></textarea>
          {errors.content && <p className="mt-1 text-red-500 text-sm">{errors.content}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="customerName" className="block text-gray-700 font-medium mb-2">
            Tên của bạn
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tên hiển thị công khai"
          />
          {errors.customerName && <p className="mt-1 text-red-500 text-sm">{errors.customerName}</p>}
        </div>
        
        {errors.submit && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
            {errors.submit}
          </div>
        )}
        
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang gửi...
              </>
            ) : 'Gửi đánh giá'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReviewForm; 