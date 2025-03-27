// src/components/auth/LoginForm.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import FormInput from './FormInput';
import PasswordInput from './PasswordInput';
import SubmitButton from './SubmitButton';
import AuthMessage from './AuthMessage';
import { loginUser } from '../../services/authService';
// Import SocialLogin đã bị xóa

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const navigate = useNavigate();
  
  // Xóa token khi component mount
  useEffect(() => {
    // Xóa thông tin đăng nhập cũ nếu có
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (name === 'remember-me') {
        setRememberMe(checked);
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    // Xóa lỗi khi người dùng bắt đầu nhập lại
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    
    // Xóa thông báo lỗi khi người dùng thay đổi dữ liệu
    if (message.type === 'error') {
      setMessage({ text: '', type: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username) {
      newErrors.username = "Vui lòng nhập tên đăng nhập";
    }
    
    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setMessage({ text: '', type: '' });
    
    try {
      // Gọi API đăng nhập với kiểm tra chặt chẽ hơn
      const response = await loginUser({
        username: formData.username,
        password: formData.password,
        remember: rememberMe
      });
      
      console.log('Kết quả đăng nhập:', response);
      
      // Kiểm tra kỹ hơn kết quả đăng nhập
      if (response && response.status === true && response.data) {
        // Lưu thông tin người dùng vào localStorage hoặc sessionStorage
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(response.data.user || response.data));
          localStorage.setItem('token', response.data.token || '');
        } else {
          sessionStorage.setItem('user', JSON.stringify(response.data.user || response.data));
          sessionStorage.setItem('token', response.data.token || '');
        }
        
        setMessage({
          text: "Đăng nhập thành công! Đang chuyển hướng...",
          type: "success"
        });
        
        // Chuyển hướng sau khi đăng nhập thành công
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        // Xử lý lỗi đăng nhập
        setMessage({
          text: response.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.",
          type: "error"
        });
      }
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      setMessage({
        text: "Có lỗi xảy ra khi kết nối đến server.",
        type: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-auto overflow-hidden"
    >
      {/* Logo & Heading */}
      <div className="text-center mb-6">
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="h-16 w-16 bg-gradient-to-br from-yellow-400 to-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3"
        >
          <FaSignInAlt />
        </motion.div>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Đăng Nhập</h2>
        <p className="text-gray-600">Đăng nhập để tiếp tục trải nghiệm dịch vụ</p>
      </div>
      
      <AnimatePresence>
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <AuthMessage message={message.text} type={message.type} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-3">
          <FormInput
            id="username"
            name="username"
            type="text"
            label="Tên đăng nhập"
            value={formData.username}
            onChange={handleChange}
            placeholder="Nhập tên đăng nhập hoặc email"
            error={errors.username}
            icon={FaUser}
            required
            className="bg-gray-50 border-0 rounded-lg shadow-sm"
          />
          
          <PasswordInput
            id="password"
            name="password"
            label="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
            className="bg-gray-50 border-0 rounded-lg shadow-sm"
          />
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
              Ghi nhớ đăng nhập
            </label>
          </div>
          
          <div className="text-sm">
            <Link
              to="/forgot-password"
              className="font-medium text-yellow-600 hover:text-yellow-500 transition-colors"
            >
              Quên mật khẩu?
            </Link>
          </div>
        </div>
        
        <div className="mt-6">
          <SubmitButton 
            isLoading={isLoading} 
            text="Đăng nhập"
            className="bg-gradient-to-r from-yellow-500 to-red-600 hover:from-yellow-600 hover:to-red-700 w-full py-3 rounded-lg shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] text-white font-medium"
          />
        </div>
        
        {/* Đã xóa phần đăng nhập bằng mạng xã hội */}
        
        {/* Đăng ký */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="font-medium text-yellow-600 hover:text-yellow-500 transition-colors">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default LoginForm;