import React from 'react';
import { FaEye, FaEdit, FaTimes } from 'react-icons/fa';

const BookingTable = ({ bookings, onViewDetails, onEditBooking, onCancelBooking }) => {
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  // Kiểm tra xem có thể chỉnh sửa không
  const canEdit = (status) => {
    return status === 'Đang chờ';
  };

  // Kiểm tra xem có thể hủy không
  const canCancel = (status) => {
    return ['Đang chờ', 'Đã xác nhận'].includes(status);
  };

  // Render status badge
  const renderStatusBadge = (status) => {
    const statusClasses = {
      'Đang chờ': 'bg-yellow-100 text-yellow-800',
      'Đã xác nhận': 'bg-green-100 text-green-800',
      'Đã hủy': 'bg-red-100 text-red-800',
      'Hoàn thành': 'bg-blue-100 text-blue-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mã đặt chỗ
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Loại
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ngày giờ
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Trạng thái
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Số khách
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tổng tiền
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {booking.bookingCode}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {booking.type === 'PARTY' ? 'Tiệc' : 'Phòng'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(booking.bookingDate)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {renderStatusBadge(booking.status)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {booking.guests} người
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatCurrency(booking.price)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button
                  onClick={() => onViewDetails(booking)}
                  className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                  title="Xem chi tiết"
                >
                  <FaEye className="w-4 h-4" />
                </button>
                
                {canEdit(booking.status) && (
                  <button
                    onClick={() => onEditBooking(booking)}
                    className="text-yellow-600 hover:text-yellow-900 inline-flex items-center"
                    title="Chỉnh sửa"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                )}
                
                {canCancel(booking.status) && (
                  <button
                    onClick={() => onCancelBooking(booking.id)}
                    className="text-red-600 hover:text-red-900 inline-flex items-center"
                    title="Hủy đặt chỗ"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;