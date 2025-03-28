import axios from 'axios';

// Cấu hình base URL cho API
const API_URL = 'http://localhost/RestAPIRestaurant/users'; // Thay đổi URL này theo API của bạn

// Thiết lập axios interceptor để tự động thêm token vào header cho mỗi request
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Hàm đăng nhập người dùng
export const loginUser = async (credentials) => {
  try {
    console.log('Đang gửi dữ liệu đăng nhập:', {
      username: credentials.username,
      password: '******' // Che dấu mật khẩu trong log
    });
    
    // Gọi API đăng nhập - điều chỉnh endpoint và cấu trúc dữ liệu theo API của bạn
    const response = await axios.post(`${API_URL}/login`, {
      username: credentials.username,
      password: credentials.password,
      remember: credentials.remember || false
    });
    
    console.log('Phản hồi đăng nhập:', {
      status: response.status,
      success: response.data.success || true
    });
    
    // Nếu API trả về dữ liệu khác cấu trúc, bạn cần điều chỉnh ở đây
    return {
      status: true,
      success: true,
      data: response.data,
      message: response.data.message || 'Đăng nhập thành công!'
    };
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    
    if (error.response) {
      // Lỗi từ server (status code không phải 2xx)
      console.log('Lỗi từ server:', error.response.data);
      
      return {
        status: false,
        success: false,
        data: null,
        message: error.response.data.message || 'Tên đăng nhập hoặc mật khẩu không đúng'
      };
    }
    
    // Lỗi mạng hoặc lỗi không xác định
    return {
      status: false,
      success: false,
      data: null,
      message: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng!'
    };
  }
};

// Đăng xuất
export const logoutUser = () => {
  // Xóa token và thông tin người dùng khỏi localStorage và sessionStorage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  
  // Xóa Authorization header
  delete axios.defaults.headers.common['Authorization'];
  
  return { success: true, message: 'Đăng xuất thành công' };
};

// Kiểm tra trạng thái đăng nhập
export const checkAuthStatus = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const user = localStorage.getItem('user') || sessionStorage.getItem('user');
  
  if (token && user) {
    try {
      return {
        isAuthenticated: true,
        user: JSON.parse(user)
      };
    } catch (error) {
      console.error('Lỗi phân tích dữ liệu người dùng:', error);
      return { isAuthenticated: false };
    }
  }
  
  return { isAuthenticated: false };
};

// Hàm đăng ký người dùng
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    
    return {
      status: true,
      success: true,
      data: response.data,
      message: response.data.message || 'Đăng ký thành công!'
    };
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        success: false,
        data: null,
        message: error.response.data.message || 'Đăng ký thất bại',
        errors: error.response.data.errors || {}
      };
    }
    
    return {
      status: false,
      success: false,
      data: null,
      message: 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.'
    };
  }
};

// Quên mật khẩu
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    
    return {
      status: true,
      success: true,
      data: response.data,
      message: response.data.message || 'Đã gửi email hướng dẫn đặt lại mật khẩu!'
    };
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        success: false,
        message: error.response.data.message || 'Không thể gửi yêu cầu đặt lại mật khẩu'
      };
    }
    
    return {
      status: false,
      success: false,
      message: 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.'
    };
  }
};

// Đặt lại mật khẩu
export const resetPassword = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, data);
    
    return {
      status: true,
      success: true,
      data: response.data,
      message: response.data.message || 'Đặt lại mật khẩu thành công!'
    };
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        success: false,
        message: error.response.data.message || 'Không thể đặt lại mật khẩu'
      };
    }
    
    return {
      status: false,
      success: false,
      message: 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.'
    };
  }
};

export default {
  loginUser,
  logoutUser,
  registerUser,
  forgotPassword,
  resetPassword,
  checkAuthStatus
};