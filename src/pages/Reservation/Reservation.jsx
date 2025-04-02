import { useState, useEffect } from "react";
import { FaUser, FaUtensils, FaFileInvoice } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

// Import components
import ReservationForm from "../../components/user/Reservation/ReservationForm";
import MenuSelection from "../../components/user/Reservation/MenuSelection";
import ConfirmationStep from "../../components/user/Reservation/ConfirmationStep";

function Reservation() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedMenu = location.state?.selectedMenu;

  // States
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    eventType: "Đặt bàn thường",
    request: "",
  });
  
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(
    selectedMenu ? [{ ...selectedMenu, quantity: 1 }] : []
  );
  const [loading, setLoading] = useState(false);

  // Steps configuration
  const steps = [
    { step: 1, title: "Thông tin", icon: FaUser },
    { step: 2, title: "Chọn món", icon: FaUtensils },
    { step: 3, title: "Xác nhận", icon: FaFileInvoice },
  ];

  // Fetch menu items
  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost/restapirestaurant/products');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Lỗi khi tải menu:', error);
      toast.error('Không thể tải danh sách món ăn!');
    } finally {
      setLoading(false);
    }
  };

  // Form handlers
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setCurrentStep(2);
      toast.success("Thông tin đã được lưu!");
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Vui lòng nhập họ tên!");
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error("Vui lòng nhập số điện thoại!");
      return false;
    }
    if (!formData.date) {
      toast.error("Vui lòng chọn ngày đặt bàn!");
      return false;
    }
    if (!formData.time) {
      toast.error("Vui lòng chọn thời gian!");
      return false;
    }
    if (!formData.guests || formData.guests < 1) {
      toast.error("Vui lòng nhập số lượng khách hợp lệ!");
      return false;
    }
    return true;
  };

  // Menu selection handlers
  const handleItemSelect = (item) => {
    setSelectedItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.filter(i => i.id !== item.id);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleQuantityChange = (item, change) => {
    setSelectedItems(prev => {
      return prev.map(i => {
        if (i.id === item.id) {
          const newQuantity = i.quantity + change;
          if (newQuantity < 1) {
            return null;
          }
          return { ...i, quantity: newQuantity };
        }
        return i;
      }).filter(Boolean);
    });
  };

  // Final submission handler
  const handleConfirmation = async () => {
    try {
      setLoading(true);
      const reservationData = {
        ...formData,
        items: selectedItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total_amount: selectedItems.reduce((sum, item) => 
          sum + (Number(item.price) * item.quantity), 0
        )
      };

      // TODO: Replace with your API endpoint
      // const response = await axios.post('YOUR_API_ENDPOINT', reservationData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success("Đặt bàn thành công! Cảm ơn quý khách!");
      navigate('/');
    } catch (error) {
      toast.error("Có lỗi xảy ra khi đặt bàn. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  // Step progress renderer
  const renderStepProgress = () => (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="flex justify-between items-center relative">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-gray-200 w-full -z-10" />
        <div 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-yellow-500 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step) => (
          <div
            key={step.step}
            className={`flex flex-col items-center ${
              currentStep >= step.step ? "text-yellow-500" : "text-gray-400"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-2
                ${currentStep >= step.step ? "bg-yellow-500 text-white" : "bg-gray-200"}
                transition-all duration-500 transform ${currentStep === step.step ? "scale-110" : ""}
              `}
            >
              <step.icon className={`text-xl ${currentStep === step.step ? "animate-bounce" : ""}`} />
            </div>
            <span className="text-sm font-medium">{step.title}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // Step content renderer
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 animate-fadeIn">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Thông tin đặt bàn
              </h2>
              <ReservationForm
                formData={formData}
                onChange={handleFormChange}
                onSubmit={handleFormSubmit}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 animate-slideIn">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Chọn món ăn
              </h2>
              <MenuSelection
                menuItems={menuItems}
                selectedItems={selectedItems}
                onItemSelect={handleItemSelect}
                onQuantityChange={handleQuantityChange}
                loading={loading}
              />
              <div className="flex justify-between mt-6 pt-6 border-t">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 
                           transition-colors duration-300"
                >
                  Quay lại
                </button>
                <button
                  onClick={() => {
                    if (selectedItems.length === 0) {
                      toast.error("Vui lòng chọn ít nhất một món!");
                      return;
                    }
                    setCurrentStep(3);
                  }}
                  className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 
                           transition-all duration-300 transform hover:scale-105"
                >
                  Tiếp tục
                </button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="animate-fadeIn">
            <ConfirmationStep
              formData={formData}
              selectedItems={selectedItems}
              onConfirm={handleConfirmation}
              onBack={() => setCurrentStep(2)}
              loading={loading}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12">
      <div className="container mx-auto px-4">
        <ToastContainer />
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Đặt bàn trực tuyến
        </h1>
        
        {renderStepProgress()}
        {renderStepContent()}
      </div>
    </div>
  );
}

export default Reservation;
