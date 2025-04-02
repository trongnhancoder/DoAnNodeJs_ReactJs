import React from 'react';
import { FaCalendar, FaClock, FaUsers, FaUser } from 'react-icons/fa';

function ReservationForm({ formData, handleChange, handleSubmit }) {
  // Tạo ràng buộc cho ngày
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 30);

  // Format dates cho input
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Tạo khung giờ cho phép
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 10; // 10:00
    const endHour = 21;   // 21:00
    
    for (let hour = startHour; hour <= endHour; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      if (hour !== endHour) {
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
      }
    }
    return slots;
  };

  // Kiểm tra giờ có hợp lệ không
  const isTimeAvailable = (timeSlot) => {
    if (!formData.date) return true;

    const selectedDate = new Date(formData.date);
    const currentDate = new Date();
    const [hours, minutes] = timeSlot.split(':');
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    // Nếu chọn ngày hôm nay
    if (selectedDate.toDateString() === currentDate.toDateString()) {
      return selectedDateTime > currentDate;
    }

    return true;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Ngày đặt */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ngày đặt <span className="text-red-500">*</span>
        </label>
        <div className="relative rounded-lg shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaCalendar className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={formatDate(tomorrow)} // Chỉ cho đặt từ ngày mai
            max={formatDate(maxDate)}
            required
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          />
        </div>
        <p className="mt-1 text-sm text-gray-500">Đặt trước ít nhất 1 ngày</p>
      </div>

      {/* Giờ đặt */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Giờ đặt <span className="text-red-500">*</span>
        </label>
        <div className="relative rounded-lg shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaClock className="h-5 w-5 text-gray-400" />
          </div>
          <select
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm appearance-none"
          >
            <option value="">Chọn giờ</option>
            {generateTimeSlots().map(timeSlot => (
              <option
                key={timeSlot}
                value={timeSlot}
                disabled={!isTimeAvailable(timeSlot)}
              >
                {timeSlot}
              </option>
            ))}
          </select>
        </div>
        <p className="mt-1 text-sm text-gray-500">Giờ phục vụ: 10:00 - 21:00</p>
      </div>

      {/* Số khách */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Số khách <span className="text-red-500">*</span>
        </label>
        <div className="relative rounded-lg shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaUsers className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            min="1"
            max="20"
            required
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            placeholder="Nhập số khách"
          />
        </div>
        <p className="mt-1 text-sm text-gray-500">Tối đa 20 khách/bàn</p>
      </div>

      {/* Họ tên */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Họ tên <span className="text-red-500">*</span>
        </label>
        <div className="relative rounded-lg shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaUser className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            placeholder="Nhập họ tên"
          />
        </div>
      </div>

      {/* Loại sự kiện */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Loại sự kiện
        </label>
        <select
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
          className="block w-full py-2.5 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
        >
          <option value="Đặt bàn">Đặt bàn thông thường</option>
          <option value="Sinh nhật">Tiệc sinh nhật</option>
          <option value="Họp mặt">Họp mặt/Hội nghị</option>
          <option value="Khác">Khác</option>
        </select>
      </div>

      {/* Yêu cầu đặc biệt */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Yêu cầu đặc biệt
        </label>
        <textarea
          name="request"
          value={formData.request}
          onChange={handleChange}
          rows="3"
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          placeholder="Nhập yêu cầu đặc biệt (nếu có)"
        ></textarea>
      </div>

      {/* Nút submit */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-3 px-4 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Tiếp tục
        </button>
      </div>
    </form>
  );
}

export default ReservationForm;
