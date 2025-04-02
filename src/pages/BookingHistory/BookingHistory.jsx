import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookingTable from '../../components/User/BookingHistory/BookingTable';
import BookingPagination from '../../components/User/BookingHistory/BookingPagination';
import EmptyBookingState from '../../components/User/BookingHistory/EmptyBookingState';
import BookingHeader from '../../components/User/BookingHistory/BookingHeader';
import LoadingSpinner from '../../components/User/BookingHistory/LoadingSpinner';
import BookingEditForm from '../../components/User/BookingHistory/BookingEditForm';
import BookingDetailModal from '../../components/User/BookingHistory/BookingDetailModal';

// Dữ liệu mẫu không thay đổi...
const sampleBookings = [
  {
    id: '1',
    bookingCode: 'TP0001',
    type: 'PARTY',
    bookingDate: '2023-11-15T18:30:00',
    status: 'Đã xác nhận',
    price: 5000000,
    guests: 20,
    partyType: 'Sinh nhật',
    menuName: 'Thực đơn cao cấp A',
    decoration: 'Trang trí theo chủ đề',
    additionalServices: ['Âm thanh ánh sáng', 'MC dẫn chương trình'],
    contactName: 'Nguyễn Văn A',
    contactPhone: '0987654321',
    contactEmail: 'nguyenvana@example.com',
    bookingNotes: 'Cần chuẩn bị bánh sinh nhật'
  },
  {
    id: '2',
    bookingCode: 'RP0002',
    type: 'ROOM',
    bookingDate: '2023-11-20T19:00:00',
    status: 'Đang chờ',
    price: 2000000,
    guests: 6,
    roomType: 'Phòng VIP',
    duration: 3,
    roomServices: ['Đồ uống miễn phí', 'Karaoke'],
    notes: 'Cần bàn ở vị trí yên tĩnh',
    contactName: 'Trần Thị B',
    contactPhone: '0912345678',
    contactEmail: 'tranthib@example.com'
  },
  {
    id: '3',
    bookingCode: 'TP0003',
    type: 'PARTY',
    bookingDate: '2023-10-25T17:00:00',
    status: 'Hoàn thành',
    price: 8000000,
    guests: 50,
    partyType: 'Liên hoan công ty',
    menuName: 'Thực đơn đặc biệt',
    decoration: 'Trang trí theo thương hiệu',
    additionalServices: ['Âm thanh ánh sáng', 'MC dẫn chương trình', 'Quay phim chụp ảnh'],
    contactName: 'Lê Văn C',
    contactPhone: '0977889900',
    contactEmail: 'levanc@company.com',
    bookingNotes: 'Chuẩn bị màn hình trình chiếu'
  },
  {
    id: '4',
    bookingCode: 'RP0004',
    type: 'ROOM',
    bookingDate: '2023-12-05T18:00:00',
    status: 'Đã xác nhận',
    price: 3000000,
    guests: 10,
    roomType: 'Phòng thường',
    duration: 4,
    roomServices: ['Đồ uống miễn phí', 'Bàn ăn tối'],
    contactName: 'Phạm Thị D',
    contactPhone: '0966778899',
    contactEmail: 'phamthid@example.com',
    bookingNotes: 'Đặt thêm đồ ăn kèm'
  },
  {
    id: '5',
    bookingCode: 'TP0005',
    type: 'PARTY',
    bookingDate: '2023-10-10T19:30:00',
    status: 'Đã hủy',
    price: 6000000,
    guests: 30,
    partyType: 'Kỷ niệm ngày cưới',
    menuName: 'Thực đơn hải sản',
    decoration: 'Trang trí lãng mạn',
    additionalServices: ['Âm thanh ánh sáng', 'Quay phim chụp ảnh'],
    contactName: 'Hoàng Văn E',
    contactPhone: '0944556677',
    contactEmail: 'hoangvane@example.com'
  },
  {
    id: '6',
    bookingCode: 'RP0006',
    type: 'ROOM',
    bookingDate: '2023-11-28T20:00:00',
    status: 'Đang chờ',
    price: 1500000,
    guests: 4,
    roomType: 'Phòng thường',
    duration: 2,
    roomServices: ['Đồ uống miễn phí'],
    notes: 'Cần ghế cao cho trẻ em',
    contactName: 'Vũ Thị F',
    contactPhone: '0933445566',
    contactEmail: 'vuthif@example.com'
  },
  {
    id: '7',
    bookingCode: 'TP0007',
    type: 'PARTY',
    bookingDate: '2023-12-20T18:00:00',
    status: 'Đã xác nhận',
    price: 10000000,
    guests: 100,
    partyType: 'Tiệc tất niên',
    menuName: 'Thực đơn truyền thống',
    decoration: 'Trang trí theo chủ đề Giáng sinh',
    additionalServices: ['Âm thanh ánh sáng', 'MC dẫn chương trình', 'Quay phim chụp ảnh', 'Biểu diễn văn nghệ'],
    contactName: 'Đặng Văn G',
    contactPhone: '0955667788',
    contactEmail: 'dangvang@company.com',
    bookingNotes: 'Cần chuẩn bị sân khấu lớn'
  },
  {
    id: '8',
    bookingCode: 'RP0008',
    type: 'ROOM',
    bookingDate: '2023-11-05T19:00:00',
    status: 'Hoàn thành',
    price: 4000000,
    guests: 8,
    roomType: 'Phòng VIP',
    duration: 5,
    roomServices: ['Đồ uống miễn phí', 'Karaoke', 'Bàn ăn tối'],
    contactName: 'Ngô Thị H',
    contactPhone: '0922334455',
    contactEmail: 'ngothih@example.com'
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
  
  // Thêm state mới để quản lý form chỉnh sửa và xem chi tiết
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);

  // Thêm hàm format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Thêm hàm format time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  useEffect(() => {
    const fetchBookingHistory = async () => {
      setLoading(true);
      
      setTimeout(() => {
        if (showEmptyState) {
          setBookings([]);
          setLoading(false);
          return;
        }
        
        if (useTestData) {
          let filteredBookings = [...sampleBookings];
          
          // Lọc theo status và type (giữ nguyên)
          if (statusFilter !== 'all') {
            filteredBookings = filteredBookings.filter(booking => booking.status === statusFilter);
          }
          
          if (typeFilter !== 'all') {
            filteredBookings = filteredBookings.filter(booking => booking.type === typeFilter);
          }
          
          // Sửa lại logic sắp xếp thời gian
          switch (sortOrder) {
            case 'newest':
              filteredBookings.sort((a, b) => {
                const dateA = new Date(a.bookingDate);
                const dateB = new Date(b.bookingDate);
                return dateB - dateA;
              });
              break;
            case 'oldest':
              filteredBookings.sort((a, b) => {
                const dateA = new Date(a.bookingDate);
                const dateB = new Date(b.bookingDate);
                return dateA - dateB;
              });
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
          
          // Phân trang (giữ nguyên)
          const startIndex = (currentPage - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          const paginatedBookings = filteredBookings.slice(startIndex, endIndex);
          
          // Thêm format date cho mỗi booking
          const formattedBookings = paginatedBookings.map(booking => ({
            ...booking,
            formattedDate: formatDate(booking.bookingDate),
            formattedTime: formatTime(booking.bookingDate)
          }));
          
          setBookings(formattedBookings);
          setTotalPages(Math.ceil(filteredBookings.length / itemsPerPage));
          setLoading(false);
          return;
        }
        
        // Code gọi API thực (giữ nguyên)
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

  // Thêm hàm kiểm tra trạng thái vào component BookingHistory
  const canEditBooking = (status) => {
    return status === 'Đang chờ';
  };

  // Thay đổi hàm xử lý xem chi tiết để mở modal thay vì chuyển trang
  const handleViewDetails = (booking) => {
    setCurrentBooking(booking);
    setShowDetailModal(true);
  };

  // Cập nhật hàm handleEditBooking
  const handleEditBooking = (booking) => {
    if (!canEditBooking(booking.status)) {
      alert('Chỉ có thể chỉnh sửa đặt chỗ có trạng thái "Đang chờ".');
      return;
    }
    
    setCurrentBooking(booking);
    setShowEditForm(true);
    // Nếu đang mở modal chi tiết, đóng nó lại
    if (showDetailModal) {
      setShowDetailModal(false);
    }
  };
  
  // Thêm hàm đóng form chỉnh sửa
  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setCurrentBooking(null);
  };
  
  // Thêm hàm đóng modal chi tiết
  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setCurrentBooking(null);
  };
  
  // Thêm hàm lưu thông tin đã chỉnh sửa
  const handleSaveBooking = (updatedBooking) => {
    if (useTestData) {
      setBookings(bookings.map(booking => 
        booking.id === updatedBooking.id ? updatedBooking : booking
      ));
      setShowEditForm(false);
      setCurrentBooking(null);
      alert('Cập nhật thông tin thành công');
      return;
    }
    
    // Thực hiện gọi API cập nhật thông tin
    try {
      axios.put(`/api/bookings/${updatedBooking.id}`, updatedBooking, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).then(() => {
        setBookings(bookings.map(booking => 
          booking.id === updatedBooking.id ? updatedBooking : booking
        ));
        setShowEditForm(false);
        setCurrentBooking(null);
        alert('Cập nhật thông tin thành công');
      });
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin:', error);
      alert('Không thể cập nhật thông tin');
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
                  <option value="newest">Mới đặt nhất</option>
                  <option value="oldest">Cũ nhất</option>
                  <option value="price-high">Giá cao đến thấp</option>
                  <option value="price-low">Giá thấp đến cao</option>
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
                  onEditBooking={handleEditBooking}
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
      
      {/* Form chỉnh sửa thông tin */}
      {showEditForm && currentBooking && canEditBooking(currentBooking.status) && (
        <BookingEditForm 
          booking={currentBooking}
          onClose={handleCloseEditForm}
          onSave={handleSaveBooking}
        />
      )}
      
      {/* Modal xem chi tiết */}
      {showDetailModal && currentBooking && (
        <BookingDetailModal 
          booking={currentBooking}
          onClose={handleCloseDetailModal}
          onEdit={handleEditBooking}
        />
      )}
    </div>
  );
};

export default BookingHistory;