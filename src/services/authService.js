import axios from 'axios';

const API_URL = 'http://localhost/restapirestaurant/users';

export const loginUser = async (userData) => {
  try {
    console.log('Sending login data:', userData);

    const response = await axios.post(`${API_URL}/login`, {
      username: userData.username, // Có thể là username hoặc email
      password: userData.password
    });

    console.log('Server response:', response.data);

    // Kiểm tra response theo cấu trúc API của bạn
    if (response.data && response.data.status === "success") {
      // API của bạn trả về token khi thành công
      return {
        status: true,
        data: response.data.data, // Token từ JWT
        message: 'Đăng nhập thành công!'
      };
    } else {
      return {
        status: false,
        data: null,
        message: response.data.message // Message lỗi từ API
      };
    }

  } catch (error) {
    console.error('Login error:', error);
    // Xử lý các trường hợp lỗi từ API của bạn
    const errorMessage = error.response?.data?.message || 'Đăng nhập thất bại';
    return {
      status: false,
      data: null,
      message: errorMessage
    };
  }
};
// Hàm đăng ký
export const registerUser = async (userData) => {
  try {
    console.log('Register request:', userData);

    const response = await axios.post(API_URL, {
      username: userData.username,
      email: userData.email,
      password: userData.password
    });

    console.log('Register response:', response.data);

    return {
      status: true,
      data: response.data,
      message: 'Đăng ký thành công!'
    };

  } catch (error) {
    console.error('Register error:', error);
    return {
      status: false,
      data: null,
      message: 'Đăng ký thất bại, vui lòng thử lại'
    };
  }
};