import React, { useState, useEffect } from 'react';
import { FaUtensils, FaShoppingCart, FaUsers, FaMoneyBillWave } from 'react-icons/fa';
import StatCard from '../../components/admin/dashboard/StatCard';
import RevenueChart from '../../components/admin/dashboard/RevenueChart';
import OrderSummary from '../../components/admin/dashboard/OrderSummary';
import PopularItems from '../../components/admin/dashboard/PopularItems';

const Dashboard = () => {
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    customers: 0,
    menuItems: 0,
    loading: true
  });

  const [dateRange, setDateRange] = useState('today'); // today, week, month, year

  useEffect(() => {
    // Giả lập việc tải dữ liệu từ API
    const fetchDashboardData = () => {
      // Trong thực tế, đây sẽ là cuộc gọi API
      setTimeout(() => {
        setStats({
          revenue: 12850000, // VND
          orders: 48,
          customers: 35,
          menuItems: 24,
          loading: false
        });
      }, 1000);
    };

    fetchDashboardData();
  }, [dateRange]);

  const handleDateRangeChange = (range) => {
    setStats(prev => ({ ...prev, loading: true }));
    setDateRange(range);
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Bảng điều khiển</h1>
        
        <div className="mt-4 sm:mt-0 inline-flex bg-white rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              dateRange === 'today'
                ? 'bg-yellow-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => handleDateRangeChange('today')}
          >
            Hôm nay
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium ${
              dateRange === 'week'
                ? 'bg-yellow-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => handleDateRangeChange('week')}
          >
            Tuần này
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium ${
              dateRange === 'month'
                ? 'bg-yellow-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => handleDateRangeChange('month')}
          >
            Tháng này
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              dateRange === 'year'
                ? 'bg-yellow-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => handleDateRangeChange('year')}
          >
            Năm nay
          </button>
        </div>
      </div>

      {/* Thống kê nhanh */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Tổng doanh thu"
          value={stats.revenue.toLocaleString('vi-VN')}
          unit="VNĐ"
          icon={<FaMoneyBillWave className="h-7 w-7" />}
          change={12.5}
          loading={stats.loading}
          color="bg-green-500"
        />
        <StatCard
          title="Đơn hàng"
          value={stats.orders}
          unit="đơn"
          icon={<FaShoppingCart className="h-7 w-7" />}
          change={8.2}
          loading={stats.loading}
          color="bg-blue-500"
        />
        <StatCard
          title="Khách hàng"
          value={stats.customers}
          unit="khách"
          icon={<FaUsers className="h-7 w-7" />}
          change={5.1}
          loading={stats.loading}
          color="bg-purple-500"
        />
        <StatCard
          title="Món ăn"
          value={stats.menuItems}
          unit="món"
          icon={<FaUtensils className="h-7 w-7" />}
          change={0}
          loading={stats.loading}
          color="bg-amber-500"
        />
      </div>

      {/* Biểu đồ doanh thu và Tổng hợp đơn hàng */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <RevenueChart dateRange={dateRange} loading={stats.loading} />
        </div>
        <div className="bg-white rounded-lg shadow">
          <OrderSummary dateRange={dateRange} loading={stats.loading} />
        </div>
      </div>

      {/* Món ăn phổ biến và Đơn hàng mới nhất */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <PopularItems loading={stats.loading} />
        </div>
        <div className="lg:col-span-3 bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Đơn hàng gần đây</h2>
          </div>
          <div className="px-4 pb-4">
            {stats.loading ? (
              <div className="animate-pulse space-y-4 py-4">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mã đơn
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Khách hàng
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thời gian
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tổng tiền
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      {
                        id: 'ORD-2415',
                        customer: 'Nguyễn Văn A',
                        time: '10:45',
                        amount: '320.000đ',
                        status: 'completed'
                      },
                      {
                        id: 'ORD-2414',
                        customer: 'Trần Thị B',
                        time: '10:30',
                        amount: '450.000đ',
                        status: 'completed'
                      },
                      {
                        id: 'ORD-2413',
                        customer: 'Lê Văn C',
                        time: '10:15',
                        amount: '280.000đ',
                        status: 'preparing'
                      },
                      {
                        id: 'ORD-2412',
                        customer: 'Phạm Văn D',
                        time: '10:05',
                        amount: '370.000đ',
                        status: 'preparing'
                      },
                      {
                        id: 'ORD-2411',
                        customer: 'Hoàng Thị E',
                        time: '9:55',
                        amount: '520.000đ',
                        status: 'served'
                      }
                    ].map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          {order.customer}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          {order.time}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          {order.amount}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              order.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : order.status === 'preparing'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {order.status === 'completed'
                              ? 'Hoàn thành'
                              : order.status === 'preparing'
                              ? 'Đang chuẩn bị'
                              : 'Đã phục vụ'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 