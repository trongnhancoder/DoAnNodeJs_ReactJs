import React from 'react';
import { FaEye, FaEdit } from 'react-icons/fa'; // Import các icon
import StatusBadge from './StatusBadge';

const BookingTable = ({ orders, onViewDetails, onEditOrder }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mã đặt chỗ</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày đặt</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giờ đặt</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loại tiệc</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số lượng món</th>
          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Hành động</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {orders.map((order) => (
          <tr key={order.order_id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.order_id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.order_date}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.order_time}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.style_tiec}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <StatusBadge status={order.status === 0 ? 'pending' : 'completed'} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {order.order_items.length} món
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
              {/* Nút xem chi tiết */}
              <button
                onClick={() => onViewDetails(order)}
                className="text-blue-500 hover:text-blue-700"
                title="Xem chi tiết"
              >
                <FaEye className="w-5 h-5 inline" />
              </button>
           
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default BookingTable;