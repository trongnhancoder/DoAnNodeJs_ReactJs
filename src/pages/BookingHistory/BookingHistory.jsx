import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookingTable from '../../components/User/BookingHistory/BookingTable';
import BookingPagination from '../../components/User/BookingHistory/BookingPagination';
import EmptyBookingState from '../../components/User/BookingHistory/EmptyBookingState';
import BookingHeader from '../../components/User/BookingHistory/BookingHeader';
import LoadingSpinner from '../../components/User/BookingHistory/LoadingSpinner';

// Dữ liệu mẫu không thay đổi...
const sampleBookings = [
  {
    id: '1',
    bookingCode: 'TP0001',
    type: 'PARTY',
    bookingDate: '2023-11-15T18:30:00',
    location: 'Phòng VIP 1, Tầng 2',
    status: 'Đã xác nhận',
    price: 5000000,
    guests: 20
  },
  // Các dữ liệu mẫu khác giữ nguyên...
  {
    id: '8',
    bookingCode: 'RP0008',
    type: 'ROOM',
    bookingDate: '2023-11-05T19:00:00',
    location: 'Phòng view biển, Tầng 4',
    status: 'Hoàn thành',
    price: 4000000,
    guests: 8
  }
];

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const [useTestData, setUseTestData] = useState(true);
  
  // Thêm state mới để lọc và sắp xếp
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest'); // newest, oldest, price-high, price-low
  const [showEmptyState, setShowEmptyState] = useState(false); // State để hiển thị màn hình trống

  useEffect(() => {
    const fetchBookingHistory = async () => {
      // Hiển thị màn hình loading
      setLoading(true);
      
      setTimeout(() => {
        if (showEmptyState) {
          setBookings([]);
          setLoading(false);
          return;
        }
        
        if (useTestData) {
          // Lọc dữ liệu theo bộ lọc đã chọn
          let filteredBookings = [...sampleBookings];
          
          // Lọc theo status
          if (statusFilter !== 'all') {
            filteredBookings = filteredBookings.filter(booking => booking.status === statusFilter);
          }
          
          // Lọc theo type
          if (typeFilter !== 'all') {
            filteredBookings = filteredBookings.filter(booking => booking.type === typeFilter);
          }
          
          // Sắp xếp theo tiêu chí đã chọn
          switch (sortOrder) {
            case 'newest':
              filteredBookings.sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));
              break;
            case 'oldest':
              filteredBookings.sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate));
              break;
            case 'price-high':
              filteredBookings.sort((a, b) => b.price - a.price);
              break;
            case 'price-low':
              filteredBookings.sort((a, b) => a.price - b.price);
              break;
            default:
              break;
          }
          
          // Phân trang
          const startIndex = (currentPage - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          const paginatedBookings = filteredBookings.slice(startIndex, endIndex);
          
          setBookings(paginatedBookings);
          setTotalPages(Math.ceil(filteredBookings.length / itemsPerPage));
          setLoading(false);
          return;
        }
        
        // Code thực gọi API khi không test UI
        try {
          const response = axios.get('/api/history', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            params: {
              page: currentPage,
              limit: itemsPerPage,
              status: statusFilter !== 'all' ? statusFilter : undefined,
              type: typeFilter !== 'all' ? typeFilter : undefined,
              sort: sortOrder
            }
          });
          
          setBookings(response.data.bookings || []);
          setTotalPages(response.data.totalPages || 1);
          setLoading(false);
        } catch (error) {
          console.error('Lỗi khi tải lịch sử đặt chỗ:', error);
          alert('Không thể tải lịch sử đặt chỗ');
          setLoading(false);
        }
      }, 800);
    };

    fetchBookingHistory();
  }, [currentPage, useTestData, statusFilter, typeFilter, sortOrder, showEmptyState]);

  const handleViewDetails = (bookingId, bookingType) => {
    if (bookingType === 'PARTY') {
      navigate(`/chi-tiet-tiec/${bookingId}`);
    } else if (bookingType === 'ROOM') {
      navigate(`/chi-tiet-phong/${bookingId}`);
    } else {
      navigate(`/chi-tiet-dat-cho/${bookingId}`);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    // Code không thay đổi...
    if (!window.confirm('Bạn có chắc chắn muốn hủy đặt chỗ này không?')) {
      return;
    }
    
    if (useTestData) {
      setBookings(bookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: 'Đã hủy' } : booking
      ));
      alert('Hủy đặt chỗ thành công');
      return;
    }
    
    try {
      await axios.put(`/api/cancel/${bookingId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      setBookings(bookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: 'Đã hủy' } : booking
      ));
      
      alert('Hủy đặt chỗ thành công');
    } catch (error) {
      console.error('Lỗi khi hủy đặt chỗ:', error);
      alert('Không thể hủy đặt chỗ');
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const toggleTestData = () => {
    setUseTestData(!useTestData);
    setLoading(true);
    setCurrentPage(1);
  };

  // Reset tất cả bộ lọc
  const resetFilters = () => {
    setStatusFilter('all');
    setTypeFilter('all');
    setSortOrder('newest');
    setCurrentPage(1);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero section với hình nền đẹp */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Lịch sử đặt chỗ</h1>
          <p className="text-lg opacity-90">Quản lý tất cả các đặt chỗ của bạn tại một nơi</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Phần control panel */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-4">
              {/* Select loại đặt chỗ */}
              <div className="min-w-32">
                <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Loại đặt chỗ
                </label>
                <select
                  id="type-filter"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="all">Tất cả</option>
                  <option value="PARTY">Tiệc</option>
                  <option value="ROOM">Phòng</option>
                </select>
              </div>
              
              {/* Select trạng thái */}
              <div className="min-w-32">
                <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Trạng thái
                </label>
                <select
                  id="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="all">Tất cả</option>
                  <option value="Đã xác nhận">Đã xác nhận</option>
                  <option value="Đang chờ">Đang chờ</option>
                  <option value="Đã hủy">Đã hủy</option>
                  <option value="Hoàn thành">Hoàn thành</option>
                </select>
              </div>
              
              {/* Select sắp xếp */}
              <div className="min-w-32">
                <label htmlFor="sort-order" className="block text-sm font-medium text-gray-700 mb-1">
                  Sắp xếp theo
                </label>
                <select
                  id="sort-order"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="oldest">Cũ nhất</option>
                  <option value="price-high">Giá cao nhất</option>
                  <option value="price-low">Giá thấp nhất</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={resetFilters}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Đặt lại
              </button>
              
              {process.env.NODE_ENV === 'development' && (
                <>
                  <button 
                    onClick={toggleTestData}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {useTestData ? 'API thực' : 'Dữ liệu mẫu'}
                  </button>
                  <button 
                    onClick={() => setShowEmptyState(!showEmptyState)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {showEmptyState ? 'Có dữ liệu' : 'Trống'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Hiển thị kết quả */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {bookings.length === 0 ? (
              <EmptyBookingState />
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <BookingTable 
                  bookings={bookings} 
                  onViewDetails={handleViewDetails} 
                  onCancelBooking={handleCancelBooking} 
                />
                
                <BookingPagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={useTestData ? sampleBookings.filter(b => {
                    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
                    if (typeFilter !== 'all' && b.type !== typeFilter) return false;
                    return true;
                  }).length : (totalPages * itemsPerPage)}
                  itemsPerPage={itemsPerPage}
                  displayedItems={bookings.length}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;