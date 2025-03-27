import axios from 'axios';

// Cấu hình base URL cho API
const API_URL = 'http://localhost/RestAPIRestaurant/users'; // Thay đổi cho phù hợp với API của bạn

// Hàm đăng ký người dùng với xử lý lỗi cải tiến
export const registerUser = async (userData) => {
  try {
    console.log('Đang gửi dữ liệu đăng ký:', userData);
    
    const response = await axios.post(`${API_URL}/register`, userData);
    
    console.log('Phản hồi từ API đăng ký:', response);
    
    // Trả về response đã được chuẩn hóa
    return {
      status: true,
      success: true,
      data: response.data,
      message: response.data.message || 'Đăng ký thành công!'
    };
  } catch (error) {
    console.error('Lỗi đăng ký:', error);
    
    // Xử lý lỗi từ API
    if (error.response) {
      console.log('Chi tiết lỗi API:', error.response.data);
      
      // Chuẩn hóa dữ liệu lỗi
      return {
        status: false,
        success: false,
        ...error.response.data, // Giữ nguyên dữ liệu từ API
        message: error.response.data.message || 'Đăng ký thất bại!',
        errors: error.response.data.errors || {} // Đảm bảo có trường errors
      };
    }
    
    // Lỗi mạng hoặc lỗi khác
    return {
      status: false,
      success: false,
      message: 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.'
    };
  }
};

// Hàm đăng nhập
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    
    return {
      status: true,
      success: true,
      data: response.data,
      message: response.data.message || 'Đăng nhập thành công!'
    };
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        success: false,
        ...error.response.data,
        message: error.response.data.message || 'Đăng nhập thất bại!'
      };
    }
    
    return {
      status: false,
      success: false,
      message: 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.'
    };
  }
};

// Kiểm tra mã xác nhận quên mật khẩu
export const verifyResetCode = async (email, code) => {
  try {
    const response = await axios.post(`${API_URL}/verify-reset-code`, { email, code });
    return {
      status: true,
      success: true,
      data: response.data
    };
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        success: false,
        ...error.response.data
      };
    }
    return {
      status: false,
      success: false,
      message: 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.'
    };
  }
};

// Cập nhật mật khẩu mới
export const resetPassword = async (email, newPassword, code) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, {
      email,
      newPassword,
      code
    });
    return {
      status: true,
      success: true,
      data: response.data
    };
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        success: false,
        ...error.response.data
      };
    }
    return {
      status: false,
      success: false,
      message: 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.'
    };
  }
};

// Gửi yêu cầu quên mật khẩu
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
        ...error.response.data,
        message: error.response.data.message || 'Không thể gửi yêu cầu đặt lại mật khẩu!'
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
  registerUser,
  loginUser,
  forgotPassword,
  verifyResetCode,
  resetPassword
};