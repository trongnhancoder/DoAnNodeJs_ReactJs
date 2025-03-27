import { useState } from 'react';
import { menuData } from '../../services/MenuData.js';
import CategoryFilter from './CategoryFilter.jsx';
import MenuList from './MenuList.jsx';

function Menu() {
  const categories = ['Tất cả', 'Món khai vị', 'Món chính', 'Tráng miệng', 'Nước uống'];
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const filteredMenu =
    selectedCategory === 'Tất cả'
      ? menuData
      : menuData.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Thực đơn</h1>

        {/* Thanh lọc */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Hiển thị danh sách món ăn */}
        <MenuList menuItems={filteredMenu} />
      </div>
    </div>
  );
}

export default Menu;