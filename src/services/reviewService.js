export const reviewsMockData = [
  {
    id: '1',
    customerName: 'Nguyễn Văn A',
    rating: 5,
    title: 'Dịch vụ tuyệt vời!',
    content: 'Buổi tiệc sinh nhật của tôi diễn ra hoàn hảo nhờ sự phục vụ chuyên nghiệp của nhà hàng.',
    date: '2023-12-01T15:30:00'
  },
  {
    id: '2',
    customerName: 'Trần Thị B',
    rating: 4,
    title: 'Đồ ăn ngon nhưng phục vụ hơi chậm',
    content: 'Món ăn rất ngon, không gian đẹp, nhưng phải đợi lâu mới được phục vụ.',
    date: '2023-11-25T18:45:00'
  },
  {
    id: '3',
    customerName: 'Lê Văn C',
    rating: 3,
    title: 'Không gian thoáng nhưng hơi ồn',
    content: 'Nhà hàng có không gian rộng rãi nhưng hơi ồn, khó nói chuyện khi nhà hàng đông khách.',
    date: '2023-11-15T20:10:00'
  },
  {
    id: '4',
    customerName: 'Phạm Thị D',
    rating: 5,
    title: 'Món ăn tuyệt vời!',
    content: 'Đặc biệt là các món hải sản rất tươi ngon. Chắc chắn sẽ quay lại.',
    date: '2023-12-05T19:30:00'
  },
  {
    id: '5',
    customerName: 'Hoàng Văn E',
    rating: 2,
    title: 'Thất vọng về dịch vụ',
    content: 'Nhân viên không thân thiện, đồ ăn làm lâu và không đúng với mô tả trên menu.',
    date: '2023-12-10T12:15:00'
  },
  {
    id: '6',
    customerName: 'Ngô Thị F',
    rating: 4,
    title: 'Không gian rất đẹp',
    content: 'Trang trí nội thất rất ấn tượng, tạo không khí ấm cúng. Thức ăn ngon.',
    date: '2023-11-30T17:45:00'
  },
  {
    id: '7',
    customerName: 'Vũ Văn G',
    rating: 1,
    title: 'Giá quá đắt so với chất lượng',
    content: 'Giá cả không tương xứng với chất lượng món ăn và dịch vụ. Thất vọng!',
    date: '2023-12-07T21:20:00'
  }
];

// Thêm đánh giá mới
export const addReview = async (reviewData) => {
  const newReview = { 
    ...reviewData, 
    id: (reviewsMockData.length + 1).toString(),
    date: new Date().toISOString()
  };
  
  reviewsMockData.push(newReview);
  return newReview;
};

// Lấy tất cả đánh giá
export const getAllReviews = () => {
  return [...reviewsMockData];
};

// Lấy đánh giá theo ID
export const getReviewById = (id) => {
  return reviewsMockData.find(review => review.id === id);
};

// Dịch vụ đánh giá
const reviewService = {
  addReview,
  getAllReviews,
  getReviewById,
  reviewsMockData
};

export default reviewService;