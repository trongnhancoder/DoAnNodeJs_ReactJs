import React, { useState } from 'react';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import MenuFilter from '../../components/admin/menu/MenuFilter';
import MenuList from '../../components/admin/menu/MenuList';
import { 
  MdAdd, 
  MdFilterList, 
  MdRestaurantMenu, 
  MdTrendingUp,
  MdStar,
  MdInventory 
} from 'react-icons/md';

const MenuPage = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handleFilter = (filters) => {
    console.log('Applied filters:', filters);
  };

  const stats = [
    {
      title: 'Tổng số món',
      value: '124',
      icon: <MdRestaurantMenu size={24} />,
      color: 'blue'
    },
    {
      title: 'Món đang bán',
      value: '98',
      icon: <MdTrendingUp size={24} />,
      color: 'green'
    },
    {
      title: 'Món phổ biến',
      value: '35',
      icon: <MdStar size={24} />,
      color: 'yellow'
    },
    {
      title: 'Hết món',
      value: '12',
      icon: <MdInventory size={24} />,
      color: 'red'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Quản lý thực đơn</h1>
              <p className="text-gray-500 mt-1">Quản lý tất cả món ăn và thức uống của nhà hàng</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setIsFilterVisible(!isFilterVisible)}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center"
              >
                <MdFilterList className="mr-2" size={20} />
                Bộ lọc
              </button>
              
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                <MdAdd className="mr-2" size={20} />
                Thêm món ăn
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center">
                <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
                  <div className={`text-${stat.color}-600`}>{stat.icon}</div>
                </div>
                <div className="ml-4">
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <h3 className="text-xl font-bold text-gray-800">{stat.value}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Section */}
        {isFilterVisible && (
          <div className="bg-white rounded-xl shadow-sm">
            <MenuFilter onFilter={handleFilter} />
          </div>
        )}

        {/* Menu List */}
        <div className="bg-white rounded-xl shadow-sm">
          <MenuList />
        </div>
      </div>
    </AdminLayout>
  );
};

export default MenuPage; 