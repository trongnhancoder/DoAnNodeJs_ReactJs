import { useState } from 'react';
import { menuData } from '../../data/MenuData.js';
import ReservationForm from './ReservationForm.jsx';
import MenuCategoryFilter from './MenuCategoryFilter.jsx';
import MenuList from './MenuList.jsx';
import Pagination from './Pagination.jsx';

function Reservation() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '',
    name: '',
    request: '',
    eventType: 'Đặt bàn',
  });


  const categories = ['Tất cả', 'Món khai vị', 'Món chính', 'Tráng miệng', 'Nước uống'];
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [selectedItems, setSelectedItems] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemIncrement = (item) => {
    const newSelectedItems = { ...selectedItems };
    if (newSelectedItems[item.id]) {
      newSelectedItems[item.id].quantity += 1;
    } else {
      newSelectedItems[item.id] = { ...item, quantity: 1 };
    }
    setSelectedItems(newSelectedItems);
    setTotalPrice(totalPrice + item.price);
  };

  // Xử lý giảm món ăn
  const handleItemDecrement = (item) => {
    const newSelectedItems = { ...selectedItems };
    if (newSelectedItems[item.id] && newSelectedItems[item.id].quantity > 0) {
      newSelectedItems[item.id].quantity -= 1;
      if (newSelectedItems[item.id].quantity === 0) {
        delete newSelectedItems[item.id];
      }
      setSelectedItems(newSelectedItems);
      setTotalPrice(totalPrice - item.price);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Đặt lịch thành công! Tổng tiền: ' + totalPrice.toLocaleString() + ' VND');
    console.log({ ...formData, selectedItems, totalPrice });
  };

  const filteredMenu =
    selectedCategory === 'Tất cả'
      ? menuData
      : menuData.filter((item) => item.category === selectedCategory);

  // Phân trang
  const totalPages = Math.ceil(filteredMenu.length / itemsPerPage);
  const paginatedMenu = filteredMenu.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Xử lý thay đổi danh mục
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); 
  };
 
  // Xử lý thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Đặt lịch trực tuyến</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ReservationForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Chọn món</h2>
            <MenuCategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
            <MenuList
              menuItems={paginatedMenu}
              handleItemIncrement={handleItemIncrement}
              handleItemDecrement={handleItemDecrement}
              selectedItems={selectedItems}
            />
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-bold">Tổng tiền: {totalPrice.toLocaleString()} VND</h3>
              <button
                onClick={handleSubmit}
                className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-md transition-colors font-semibold mt-4"
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservation;