import axios from 'axios';

const API_URL = 'http://localhost/restapirestaurant';

// Post order data và lấy response
export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/order`, orderData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Ánh xạ loại tiệc từ ID sang tên hiển thị
const mapPartyTypeToName = (partyTypeId) => {
  const partyTypes = {
    'normal': 'Đặt bàn thường',
    'birthday': 'Tiệc sinh nhật',
    'anniversary': 'Kỷ niệm',
    'family': 'Tiệc gia đình',
    'business': 'Hội họp',
    'other': 'Khác'
  };
  
  return partyTypes[partyTypeId] || 'Đặt bàn thường';
};

// Format dữ liệu đặt bàn
export const formatOrderData = (formData, selectedItems, userData) => {
  // Tính tổng tiền
  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + (parseFloat(item.price) * item.quantity), 
    0
  ).toFixed(2);
  
  // Tạo order_items từ các món đã chọn
  const orderItems = selectedItems.map(item => ({
    menu_item_id: item.id,
    quantity: item.quantity,
    status: "pending"
  }));
  
  // Cấu trúc dữ liệu theo yêu cầu API
  return {
    user_id: userData?.id,
    username: userData?.username ,
    email: userData?.email ,
    total_price: totalPrice,
    num_people: parseInt(formData.guests),
    special_request: formData.request || "",
    customer_name: formData.name,
    order_date: formData.date,
    order_time: formData.time + ":00",
    status: 0,
    style_tiec: mapPartyTypeToName(formData.partyType),
    order_items: orderItems,
    payment_method: "cash" // Mặc định, sẽ được ghi đè
  };
};