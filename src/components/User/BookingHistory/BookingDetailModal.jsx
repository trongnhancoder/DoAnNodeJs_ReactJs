import React from 'react';

const BookingDetailModal = ({ booking, onClose, onEdit }) => {
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

  const renderExtraDetails = () => {
    if (booking.type === 'PARTY') {
      return (
        <div className="space-y-4 mt-4">
          <h3 className="text-lg font-semibold text-gray-800">Thông tin tiệc</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Loại tiệc</p>
              <p className="mt-1">{booking.partyType || 'Tiệc thông thường'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Thực đơn</p>
              <p className="mt-1">{booking.menuName || 'Thực đơn cơ bản'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Trang trí</p>
              <p className="mt-1">{booking.decoration || 'Trang trí tiêu chuẩn'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Dịch vụ bổ sung</p>
              <div className="mt-1">
                {booking.additionalServices && booking.additionalServices.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {booking.additionalServices.map((service, index) => (
                      <li key={index}>{service}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Không có</p>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    } else if (booking.type === 'ROOM') {
      return (
        <div className="space-y-4 mt-4">
          <h3 className="text-lg font-semibold text-gray-800">Thông tin phòng</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Loại phòng</p>
              <p className="mt-1">{booking.roomType || 'Phòng tiêu chuẩn'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Thời gian sử dụng</p>
              <p className="mt-1">{booking.duration || '2'} giờ</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Dịch vụ kèm theo</p>
              <div className="mt-1">
                {booking.roomServices && booking.roomServices.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {booking.roomServices.map((service, index) => (
                      <li key={index}>{service}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Không có</p>
                )}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Ghi chú</p>
              <p className="mt-1">{booking.notes || 'Không có ghi chú'}</p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Trong component BookingDetailModal, thêm hàm kiểm tra trạng thái
  const canEdit = (status) => {
    return status === 'Đang chờ';
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4 my-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Chi tiết đặt chỗ</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Mã đặt chỗ</p>
              <p className="text-xl font-semibold">{booking.bookingCode}</p>
            </div>
            <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
              {booking.status}
            </span>
          </div>
          
          <div className="mt-3 text-sm">
            {booking.status === 'Đang chờ' ? (
              <p className="text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Bạn có thể chỉnh sửa thông tin đặt chỗ này
              </p>
            ) : (
              <p className="text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Không thể chỉnh sửa đặt chỗ có trạng thái "{booking.status}"
              </p>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Thông tin cơ bản</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Loại đặt chỗ</p>
              <p className="mt-1">{booking.type === 'PARTY' ? 'Tiệc' : 'Phòng'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Ngày và giờ</p>
              <p className="mt-1">{formatDate(booking.bookingDate)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Số lượng khách</p>
              <p className="mt-1">{booking.guests} người</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Tổng tiền</p>
              <p className="mt-1 font-semibold text-lg text-indigo-600">{formatPrice(booking.price)}</p>
            </div>
          </div>
        </div>
        
        {/* Thông tin thêm tùy theo loại đặt chỗ */}
        {renderExtraDetails()}
        
        {/* Thông tin liên hệ */}
        <div className="space-y-4 mt-4">
          <h3 className="text-lg font-semibold text-gray-800">Thông tin liên hệ</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Họ tên</p>
              <p className="mt-1">{booking.contactName || 'Chưa cung cấp'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Số điện thoại</p>
              <p className="mt-1">{booking.contactPhone || 'Chưa cung cấp'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="mt-1">{booking.contactEmail || 'Chưa cung cấp'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Ghi chú đặt chỗ</p>
              <p className="mt-1">{booking.bookingNotes || 'Không có ghi chú'}</p>
            </div>
          </div>
        </div>
        
        {/* Lịch sử cập nhật */}
        {booking.updateHistory && booking.updateHistory.length > 0 && (
          <div className="space-y-4 mt-4">
            <h3 className="text-lg font-semibold text-gray-800">Lịch sử cập nhật</h3>
            <div className="border rounded-md divide-y">
              {booking.updateHistory.map((update, index) => (
                <div key={index} className="p-3">
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600">{update.action}</p>
                    <p className="text-sm text-gray-500">{formatDate(update.date)}</p>
                  </div>
                  {update.note && <p className="text-sm mt-1">{update.note}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Đóng
          </button>
          
          {canEdit(booking.status) && (
            <button
              type="button"
              onClick={() => onEdit(booking)}
              className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Chỉnh sửa
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetailModal; 