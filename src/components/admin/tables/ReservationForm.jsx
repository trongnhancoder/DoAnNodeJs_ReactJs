import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const ReservationForm = ({ reservation, tables, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: null,
    customerName: '',
    phoneNumber: '',
    email: '',
    date: '',
    time: '',
    guests: 2,
    tableId: '',
    tableName: '',
    status: 'pending',
    note: '',
  });
  const [errors, setErrors] = useState({});
  const [availableTables, setAvailableTables] = useState([]);

  // Mock data - trong thực tế sẽ lấy từ props hoặc API
  const mockTables = [
    { id: 1, name: 'Bàn 01', capacity: 2, area: 'Tầng 1' },
    { id: 2, name: 'Bàn 02', capacity: 4, area: 'Tầng 1' },
    { id: 3, name: 'Bàn 03', capacity: 6, area: 'Tầng 1' },
    { id: 6, name: 'Bàn 06', capacity: 4, area: 'Tầng 2' },
    { id: 8, name: 'Bàn 08', capacity: 2, area: 'Tầng 2' },
    { id: 9, name: 'Bàn VIP 01', capacity: 10, area: 'VIP' },
    { id: 10, name: 'Bàn VIP 02', capacity: 12, area: 'VIP' },
  ];

  useEffect(() => {
    setAvailableTables(tables || mockTables);
  }, [tables]);

  useEffect(() => {
    if (reservation) {
      setFormData({
        id: reservation.id,
        customerName: reservation.customerName,
        phoneNumber: reservation.phoneNumber,
        email: reservation.email,
        date: reservation.date,
        time: reservation.time,
        guests: reservation.guests,
        tableId: reservation.tableId,
        tableName: reservation.tableName,
        status: reservation.status,
        note: reservation.note || '',
      });
    } else {
      // Set default date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setFormData(prev => ({
        ...prev,
        date: tomorrow.toISOString().split('T')[0],
        time: '18:00'
      }));
    }
  }, [reservation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Nếu thay đổi số khách, lọc bàn có sức chứa phù hợp
    if (name === 'guests') {
      const guests = parseInt(value) || 1;
      
      // Nếu đã chọn bàn trước đó, kiểm tra xem bàn có phù hợp với số khách mới không
      if (formData.tableId) {
        const selectedTable = availableTables.find(table => table.id === parseInt(formData.tableId));
        if (selectedTable && selectedTable.capacity < guests) {
          setFormData(prev => ({ ...prev, tableId: '', tableName: '' }));
        }
      }
    }

    // Nếu chọn bàn, cập nhật tableName
    if (name === 'tableId') {
      const tableId = parseInt(value);
      const selectedTable = availableTables.find(table => table.id === tableId);
      if (selectedTable) {
        setFormData(prev => ({ ...prev, tableName: selectedTable.name }));
      }
    }

    // Clear errors when field is changed
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Vui lòng nhập tên khách hàng';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Vui lòng nhập số điện thoại';
    } else if (!/^(0[3|5|7|8|9])+([0-9]{8})$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Số điện thoại không hợp lệ';
    }
    
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.date) {
      newErrors.date = 'Vui lòng chọn ngày đặt bàn';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'Ngày đặt bàn không thể là ngày trong quá khứ';
      }
    }
    
    if (!formData.time) {
      newErrors.time = 'Vui lòng chọn giờ đặt bàn';
    }
    
    if (!formData.guests || formData.guests < 1) {
      newErrors.guests = 'Vui lòng nhập số khách hợp lệ';
    }
    
    if (!formData.tableId) {
      newErrors.tableId = 'Vui lòng chọn bàn';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    onSave(formData);
  };

  // Lọc bàn phù hợp với số khách
  const filteredTables = availableTables.filter(
    table => table.capacity >= (parseInt(formData.guests) || 1)
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {reservation ? 'Chỉnh sửa đặt bàn' : 'Thêm đặt bàn mới'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Thông tin khách hàng */}
            <div>
              <h3 className="font-medium text-gray-800 mb-4">Thông tin khách hàng</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên khách hàng <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                    errors.customerName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.customerName && (
                  <p className="mt-1 text-sm text-red-500">{errors.customerName}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                    errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ghi chú
                </label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Ghi chú đặc biệt, yêu cầu..."
                ></textarea>
              </div>
            </div>
            
            {/* Thông tin đặt bàn */}
            <div>
              <h3 className="font-medium text-gray-800 mb-4">Thông tin đặt bàn</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ngày đặt bàn <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                    errors.date ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-500">{errors.date}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giờ đặt bàn <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                    errors.time ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.time && (
                  <p className="mt-1 text-sm text-red-500">{errors.time}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số khách <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  min="1"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                    errors.guests ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.guests && (
                  <p className="mt-1 text-sm text-red-500">{errors.guests}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chọn bàn <span className="text-red-500">*</span>
                </label>
                <select
                  name="tableId"
                  value={formData.tableId}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                    errors.tableId ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Chọn bàn phù hợp</option>
                  {filteredTables.map((table) => (
                    <option key={table.id} value={table.id}>
                      {table.name} - {table.area} ({table.capacity} khách)
                    </option>
                  ))}
                </select>
                {errors.tableId && (
                  <p className="mt-1 text-sm text-red-500">{errors.tableId}</p>
                )}
              </div>
              
              {reservation && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trạng thái
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="pending">Chờ xác nhận</option>
                    <option value="confirmed">Đã xác nhận</option>
                    <option value="cancelled">Đã hủy</option>
                    <option value="completed">Hoàn thành</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            >
              {reservation ? 'Cập nhật' : 'Thêm đặt bàn'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm; 