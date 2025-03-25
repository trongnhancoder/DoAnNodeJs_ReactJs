import { useState } from "react";
import { FaUser, FaUtensils, FaFileInvoice } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { menuData } from "../../data/MenuData.js";
import ReservationForm from "./ReservationForm.jsx";
import MenuCategoryFilter from "./MenuCategoryFilter.jsx";
import MenuList from "./MenuList.jsx";
import Pagination from "./Pagination.jsx";
import bg_image from "../../assets/bg_revervation.png";

function Reservation() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "",
    name: "",
    request: "",
    eventType: "Đặt bàn",
  });
  const categories = [
    "Tất cả",
    "Món khai vị",
    "Món chính",
    "Tráng miệng",
    "Nước uống",
  ];
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [selectedItems, setSelectedItems] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const steps = [
    { step: 1, title: "Thông tin", icon: FaUser },
    { step: 2, title: "Chọn món", icon: FaUtensils },
    { step: 3, title: "Xác nhận", icon: FaFileInvoice },
  ];
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    return formData.date && formData.time && formData.guests && formData.name;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setCurrentStep(2);
      toast.success("Thông tin đã được lưu!");
    } else {
      toast.error("Vui lòng điền đầy đủ thông tin đặt bàn!");
    }
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

  // Menu Filtering and Pagination
  const filteredMenu =
    selectedCategory === "Tất cả"
      ? menuData
      : menuData.filter((item) => item.category === selectedCategory);

  const totalPages = Math.ceil(filteredMenu.length / itemsPerPage);
  const paginatedMenu = filteredMenu.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Final Submit Handler
  const handleFinalSubmit = () => {
    toast.success("Đặt bàn thành công! Cảm ơn quý khách!");
    console.log({
      formData,
      selectedItems,
      totalPrice,
    });

    // Reset all states
    setFormData({
      date: "",
      time: "",
      guests: "",
      name: "",
      request: "",
      eventType: "Đặt bàn",
    });
    setSelectedItems({});
    setTotalPrice(0);
    setCurrentStep(1);
  };

  // Step Content Renderer
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Thông tin đặt bàn
              </h2>
              <ReservationForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleFormSubmit}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Chọn món ăn
              </h2>
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
                <h3 className="text-lg font-bold">
                  Tổng tiền: {totalPrice.toLocaleString()} VND
                </h3>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-2 bg-gray-500 text-white rounded-md 
                             hover:bg-gray-600 transition-colors"
                  >
                    Quay lại
                  </button>
                  <button
                    onClick={() => {
                      if (Object.keys(selectedItems).length === 0) {
                        toast.error("Vui lòng chọn ít nhất một món!");
                        return;
                      }
                      setCurrentStep(3);
                    }}
                    className="px-6 py-2 bg-yellow-500 text-white rounded-md 
                             hover:bg-yellow-600 transition-colors"
                  >
                    Tiếp tục
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Xác nhận đơn hàng
              </h2>

              <div className="mb-6 p-4 bg-gray-50 rounded-md">
                <h3 className="font-semibold mb-3">Thông tin đặt bàn</h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Ngày:</span> {formData.date}
                  </p>
                  <p>
                    <span className="font-medium">Thời gian:</span>{" "}
                    {formData.time}
                  </p>
                  <p>
                    <span className="font-medium">Số khách:</span>{" "}
                    {formData.guests}
                  </p>
                  <p>
                    <span className="font-medium">Tên:</span> {formData.name}
                  </p>
                  {formData.request && (
                    <p>
                      <span className="font-medium">Yêu cầu đặc biệt:</span>{" "}
                      {formData.request}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3">Chi tiết món ăn</h3>
                {Object.values(selectedItems).map((item) => (
                  <div key={item.id} className="flex justify-between py-2">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>
                      {(item.price * item.quantity).toLocaleString()} VND
                    </span>
                  </div>
                ))}
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng cộng:</span>
                    <span>{totalPrice.toLocaleString()} VND</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2 bg-gray-500 text-white rounded-md 
                           hover:bg-gray-600 transition-colors"
                >
                  Quay lại
                </button>
                <button
                  onClick={handleFinalSubmit}
                  className="px-6 py-2 bg-green-500 text-white rounded-md 
                           hover:bg-green-600 transition-colors"
                >
                  Xác nhận đặt bàn
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <ToastContainer />
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            Đặt lịch trực tuyến
          </h1>
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex justify-center items-center mb-8">
              {steps.map((item, index) => (
                <div key={item.step} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full 
                ${
                  currentStep >= item.step
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
                  >
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`mx-2 text-sm font-medium
                ${
                  currentStep >= item.step ? "text-yellow-500" : "text-gray-500"
                }`}
                  >
                    {item.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-24 h-1
                  ${currentStep > item.step ? "bg-yellow-500" : "bg-gray-200"}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {renderStep()}
        </div>
      </div>
    </div>
  );
}

export default Reservation;
