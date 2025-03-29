import React from 'react';
import StatusBadge from './StatusBadge';
import BookingTypeTag from './BookingTypeTag';

const BookingTable = ({ bookings, onViewDetails, onCancelBooking, onEditBooking }) => {
  // Format thời gian và giá tiền
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Xác định màu sắc cho trạng thái
  const getStatusColor = (status) => {
    switch (status) {
      case 'Đã xác nhận':
        return 'bg-green-100 text-green-800';
      case 'Đang chờ':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hoàn thành':
        return 'bg-blue-100 text-blue-800';
      case 'Đã hủy':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Kiểm tra xem đặt chỗ có được chỉnh sửa không
  const canEdit = (status) => {
    return status === 'Đang chờ';
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mã đặt chỗ
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Loại
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ngày đặt
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Trạng thái
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Giá tiền
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Số khách
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{booking.bookingCode}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {booking.type === 'PARTY' ? 'Tiệc' : 'Phòng'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{formatDate(booking.bookingDate)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatPrice(booking.price)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {booking.guests} người
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onViewDetails(booking)}
                    className="text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out"
                  >
                    Xem chi tiết
                  </button>
                  
                  {canEdit(booking.status) && (
                    <button
                      onClick={() => onEditBooking(booking)}
                      className="text-blue-600 hover:text-blue-900 transition duration-150 ease-in-out"
                    >
                      Chỉnh sửa
                    </button>
                  )}
                  
                  {booking.status === 'Đang chờ' && (
                    <button
                      onClick={() => onCancelBooking(booking.id)}
                      className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
                    >
                      Hủy đặt chỗ
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;