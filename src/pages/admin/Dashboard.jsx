import React from 'react';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import { 
  MdAttachMoney, 
  MdRestaurant, 
  MdPeople, 
  MdRestaurantMenu,
  MdDownload,
  MdTrendingUp,
  MdMoreVert
} from 'react-icons/md';

const Dashboard = () => {
  // Dữ liệu mẫu cho thống kê
  const stats = [
    {
      title: 'Tổng doanh thu',
      value: '12.5M VNĐ',
      increase: '+12%',
      icon: <MdAttachMoney size={24} />,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      title: 'Đơn đặt bàn hôm nay',
      value: '25',
      increase: '+5%',
      icon: <MdRestaurant size={24} />,
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      title: 'Khách hàng mới',
      value: '48',
      increase: '+8%',
      icon: <MdPeople size={24} />,
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      title: 'Tổng số món ăn',
      value: '156',
      increase: '+3%',
      icon: <MdRestaurantMenu size={24} />,
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600'
    }
  ];

  // Dữ liệu mẫu cho đơn đặt bàn gần đây
  const recentReservations = [
    {
      id: '#12345',
      customer: 'Nguyễn Văn A',
      date: '20/01/2024',
      time: '19:00',
      people: 4,
      status: 'confirmed'
    },
    {
      id: '#12346',
      customer: 'Trần Thị B',
      date: '20/01/2024',
      time: '20:00',
      people: 2,
      status: 'pending'
    },
    {
      id: '#12347',
      customer: 'Lê Văn C',
      date: '21/01/2024',
      time: '18:30',
      people: 6,
      status: 'confirmed'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 p-6 bg-gray-50">
        {/* Tiêu đề trang */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Tổng quan</h1>
              <p className="text-gray-500 mt-1">Thống kê và báo cáo tổng quan</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center transition duration-200">
                <MdDownload className="mr-2" size={20} />
                Tải báo cáo
              </button>
            </div>
          </div>
        </div>

        {/* Thống kê */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                  <div className="flex items-center mt-2">
                    <MdTrendingUp className="text-green-500 mr-1" />
                    <p className="text-green-500 text-sm">{stat.increase} so với tháng trước</p>
                  </div>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <div className={stat.textColor}>{stat.icon}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Biểu đồ và Đơn đặt bàn gần đây */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Biểu đồ doanh thu */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Doanh thu theo tháng</h2>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <MdMoreVert size={20} />
              </button>
            </div>
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
              <span className="text-gray-400">Biểu đồ doanh thu</span>
            </div>
          </div>

          {/* Đơn đặt bàn gần đây */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Đơn đặt bàn gần đây</h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Xem tất cả
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Khách hàng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ngày
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Giờ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Số người
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentReservations.map((reservation) => (
                    <tr key={reservation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-blue-600">
                          {reservation.id}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {reservation.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reservation.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reservation.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reservation.people}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          reservation.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {reservation.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Món ăn phổ biến */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Món ăn phổ biến</h2>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <MdMoreVert size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                <div>
                  <h3 className="font-medium text-gray-800">Món ăn #{item}</h3>
                  <p className="text-sm text-gray-500">Đã đặt: 24 lần</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;