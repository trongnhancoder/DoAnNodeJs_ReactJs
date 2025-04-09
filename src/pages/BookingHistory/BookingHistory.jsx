import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookingTable from '../../components/User/BookingHistory/BookingTable';
import BookingPagination from '../../components/User/BookingHistory/BookingPagination';
import EmptyBookingState from '../../components/User/BookingHistory/EmptyBookingState';
import LoadingSpinner from '../../components/User/BookingHistory/LoadingSpinner';
import BookingDetailModal from '../../components/User/BookingHistory/BookingDetailModal';
import BookingEditForm from '../../components/User/BookingHistory/BookingEditForm';

const API_URL = 'http://localhost/restapirestaurant';

const BookingHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số lượng mục trên mỗi trang

  const navigate = useNavigate();

  // Hàm xử lý dữ liệu trả về từ API
  const processOrders = (orders) => {
    const groupedOrders = orders.reduce((acc, order) => {
      const existingOrder = acc.find((o) => o.order_id === order.order_id);
      if (existingOrder) {
        existingOrder.order_items = existingOrder.order_items.concat(order.order_items);
      } else {
        acc.push({ ...order, order_items: [...order.order_items] });
      }
      return acc;
    }, []);
  
    // Tính tổng số lượng món cho từng đơn hàng
    groupedOrders.forEach((order) => {
      order.totalItems = order.order_items.reduce((total, item) => total + item.quantity, 0);
    });
  
    return groupedOrders;
  };

  // Lấy userId từ token
  const getUserIdFromToken = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Không tìm thấy token');
      }

      const response = await axios.get(`${API_URL}/users/response`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.data && response.data.data.sub) {
        return response.data.data.sub;
      }

      throw new Error('Không tìm thấy userId trong response');
    } catch (error) {
      console.error('Lỗi khi lấy userId từ token:', error);
      throw error;
    }
  };

  // Lấy danh sách orders
  const fetchOrders = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/order/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && Array.isArray(response.data)) {
        return response.data;
      }

      throw new Error('Dữ liệu trả về từ API không hợp lệ');
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đơn hàng:', error);
      throw error;
    }
  };

  // Load dữ liệu
  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const userId = await getUserIdFromToken();
        const orderData = await fetchOrders(userId);
        const processedOrders = processOrders(orderData); // Xử lý dữ liệu trước khi set vào state
        setOrders(processedOrders);
        setError(null);
      } catch (error) {
        console.error('Lỗi:', error);
        if (error.message.includes('đăng nhập')) {
          setError('Vui lòng đăng nhập để xem lịch sử đơn hàng');
          setTimeout(() => {
            navigate('/login', { state: { from: '/booking-history' } });
          }, 1500);
        } else {
          setError('Không thể tải lịch sử đơn hàng. Vui lòng thử lại sau.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [navigate]);

  // Xử lý xem chi tiết đơn hàng
  const handleViewDetails = (order) => {
    const totalItems = order.order_items.reduce((total, item) => total + item.quantity, 0);
    setSelectedOrder({ ...order, totalItems });
    setShowDetailModal(true);
  };
  // Xử lý đóng modal chi tiết
  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedOrder(null);
  };

  // Xử lý mở form chỉnh sửa
  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setShowEditForm(true);
  };

  // Xử lý đóng form chỉnh sửa
  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setSelectedOrder(null);
  };

  // Xử lý lưu thông tin chỉnh sửa
  const handleSaveEdit = (updatedOrder) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.order_id === updatedOrder.order_id
          ? {
              ...order,
              ...updatedOrder,
              totalItems: updatedOrder.order_items.reduce((total, item) => total + item.quantity, 0),
            }
          : order
      )
    );
    setShowEditForm(false);
    setSelectedOrder(null);
  };

  // Xử lý thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Tính toán các mục hiển thị trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedOrders = orders.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold">Lịch sử đơn hàng</h1>
          <p className="mt-2">Xem và quản lý các đơn hàng của bạn</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded">
            <p>{error}</p>
          </div>
        ) : orders.length === 0 ? (
          <EmptyBookingState />
        ) : (
          <div className="bg-white rounded-lg shadow">
            <BookingTable orders={displayedOrders} onViewDetails={handleViewDetails} onEditOrder={handleEditOrder} />
            <BookingPagination
              currentPage={currentPage}
              totalPages={Math.ceil(orders.length / itemsPerPage)}
              onPageChange={handlePageChange}
              totalItems={orders.length}
              itemsPerPage={itemsPerPage}
              displayedItems={displayedOrders.length}
            />
          </div>
        )}
      </div>

      {/* Modal chi tiết */}
      {showDetailModal && selectedOrder && (
        <BookingDetailModal booking={selectedOrder} onClose={handleCloseModal} />
      )}

      {/* Form chỉnh sửa */}
      {showEditForm && selectedOrder && (
        <BookingEditForm
          booking={selectedOrder}
          onClose={handleCloseEditForm}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default BookingHistory;