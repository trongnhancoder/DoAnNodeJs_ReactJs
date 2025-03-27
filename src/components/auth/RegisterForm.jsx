// src/components/auth/RegisterForm.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaUserPlus } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import FormInput from './FormInput';
import PasswordInput from './PasswordInput';
import SubmitButton from './SubmitButton';
import AuthMessage from './AuthMessage';
import { registerUser } from '../../services/authService';
import CryptoJS from 'crypto-js';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Xóa lỗi khi người dùng nhập lại
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    
    // Xóa thông báo lỗi
    if (message.type === 'error') {
      setMessage({ text: '', type: '' });
    }
    
    // Kiểm tra mật khẩu xác nhận khi cần
    if ((name === 'password' && formData.confirmPassword && value !== formData.confirmPassword) || 
        (name === 'confirmPassword' && value !== formData.password)) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Mật khẩu không khớp' }));
    } else if (name === 'confirmPassword' && value === formData.password) {
      setErrors(prev => ({ ...prev, confirmPassword: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = "Vui lòng nhập họ tên";
    
    if (!formData.email) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    
    if (formData.phone && !/^\d{9,11}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }
    
    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
    }
    
    if (!agreeTerms) {
      newErrors.terms = "Bạn phải đồng ý với điều khoản dịch vụ";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Hàm xử lý lỗi đã tối ưu
  const processError = (response) => {
    const newErrors = {};
    let errorMessage = '';
    
    // Nếu có phản hồi với thông báo lỗi
    if (response?.message) {
      const message = response.message.toLowerCase();
      
      // Kiểm tra email
      if (message.includes('email') && 
          (message.includes('tồn tại') || message.includes('already') || message.includes('used'))) {
        newErrors.email = 'Email này đã được đăng ký';
        errorMessage = 'Email đã tồn tại trong hệ thống';
      } 
      // Kiểm tra số điện thoại
      else if ((message.includes('phone') || message.includes('số điện thoại')) && 
              (message.includes('tồn tại') || message.includes('already') || message.includes('used'))) {
        newErrors.phone = 'Số điện thoại này đã được đăng ký';
        errorMessage = 'Số điện thoại đã tồn tại trong hệ thống';
      } 
      // Kiểm tra tên đăng nhập
      else if ((message.includes('username') || message.includes('tên') || message.includes('name')) && 
               (message.includes('tồn tại') || message.includes('already') || message.includes('used'))) {
        newErrors.name = 'Tên đăng nhập này đã được sử dụng';
        errorMessage = 'Tên đăng nhập đã tồn tại trong hệ thống';
      } else {
        errorMessage = response.message;
      }
    }
    
    // Kiểm tra trường errors nếu có
    if (response?.errors) {
      if (response.errors.email) newErrors.email = response.errors.email;
      if (response.errors.phone) newErrors.phone = response.errors.phone;
      if (response.errors.username || response.errors.name) {
        newErrors.name = response.errors.username || response.errors.name;
      }
      
      // Nếu không có errorMessage từ trước, lấy thông báo đầu tiên từ errors
      if (!errorMessage) {
        const firstError = Object.values(response.errors)[0];
        errorMessage = firstError || 'Đăng ký thất bại';
      }
    }
    
    // Nếu không tìm thấy thông báo cụ thể
    if (!errorMessage) {
      errorMessage = "Đăng ký thất bại. Vui lòng thử lại.";
    }
    
    return { errors: newErrors, message: errorMessage };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setMessage({ text: '', type: '' });
    
    try {
      // Mã hóa mật khẩu
      const hashedPassword = CryptoJS.SHA256(formData.password).toString();
      
      const response = await registerUser({
        username: formData.name,
        password: hashedPassword,
        email: formData.email,
        phone: formData.phone || ''
      });
      
      // Kiểm tra phản hồi từ API
      if (response?.status === true || response?.success === true) {
        setMessage({
          text: "Đăng ký thành công! Vui lòng đăng nhập.",
          type: "success"
        });
        
        // Chuyển hướng sau 2 giây
        setTimeout(() => navigate("/login"), 2000);
      } else {
        // Xử lý lỗi nếu có
        const { errors: fieldErrors, message: errorMessage } = processError(response);
        setErrors(prev => ({ ...prev, ...fieldErrors }));
        setMessage({ text: errorMessage, type: 'error' });
      }
    } catch (error) {
      // Xử lý lỗi từ API hoặc mạng
      if (error.response?.data) {
        const { errors: fieldErrors, message: errorMessage } = processError(error.response.data);
        setErrors(prev => ({ ...prev, ...fieldErrors }));
        setMessage({ text: errorMessage, type: 'error' });
      } else {
        setMessage({
          text: "Không thể kết nối đến máy chủ. Vui lòng thử lại sau.",
          type: "error"
        });
      }
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
          <FaUserPlus />
        </motion.div>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Tạo Tài Khoản</h2>
        <p className="text-gray-600">Tham gia cùng chúng tôi để có trải nghiệm tốt nhất</p>
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
      
      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-3">
          <FormInput
            id="name"
            name="name"
            type="text"
            label="Họ và tên"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nhập họ và tên"
            error={errors.name}
            icon={FaUser}
            required
            className="bg-gray-50 border-0 rounded-lg shadow-sm"
          />
          
          <FormInput
            id="email"
            name="email"
            type="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Nhập email"
            error={errors.email}
            icon={FaEnvelope}
            required
            className="bg-gray-50 border-0 rounded-lg shadow-sm"
          />
          
          <FormInput
            id="phone"
            name="phone"
            type="tel"
            label="Số điện thoại"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Nhập số điện thoại"
            error={errors.phone}
            icon={FaPhone}
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
          
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
            className="bg-gray-50 border-0 rounded-lg shadow-sm"
          />
        </div>
        
        <div className="flex items-start mt-4">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
              className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className={`text-gray-600 ${errors.terms ? 'text-red-600' : ''}`}>
              Tôi đồng ý với <a href="#" className="text-yellow-600 hover:underline">Điều khoản dịch vụ</a> và <a href="#" className="text-yellow-600 hover:underline">Chính sách bảo mật</a>
            </label>
            {errors.terms && <p className="text-red-600 mt-1 text-xs">{errors.terms}</p>}
          </div>
        </div>
        
        <div className="mt-6">
          <SubmitButton 
            isLoading={isLoading} 
            text="Đăng ký ngay"
            className="bg-gradient-to-r from-yellow-500 to-red-600 hover:from-yellow-600 hover:to-red-700 w-full py-3 rounded-lg shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] text-white font-medium"
          />
        </div>
        
        {/* Đăng nhập */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Đã có tài khoản?{' '}
            <Link to="/login" className="font-medium text-yellow-600 hover:text-yellow-500 transition-colors">
              Đăng nhập
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default RegisterForm;