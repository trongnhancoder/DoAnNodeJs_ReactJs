// src/components/auth/ForgotPasswordForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import FormInput from './FormInput';
import SubmitButton from './SubmitButton';
import AuthMessage from './AuthMessage';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Vui lòng nhập địa chỉ email');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email không hợp lệ');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Giả lập gọi API - thay thế bằng API thực tế khi có
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Thành công
      setIsSubmitted(true);
    } catch (err) {
      setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
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
      <div className="text-center mb-8">
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="h-16 w-16 bg-gradient-to-br from-yellow-400 to-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3"
        >
          <FaLock />
        </motion.div>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Quên Mật Khẩu?</h2>
        <p className="text-gray-600">Đừng lo, chúng tôi sẽ giúp bạn khôi phục mật khẩu</p>
      </div>
      
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 mb-6">
              <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-xl leading-6 font-bold text-gray-900 mb-3">Yêu cầu đã được gửi!</h3>
            <div className="mb-6">
              <p className="text-gray-600">
                Chúng tôi đã gửi email hướng dẫn đặt lại mật khẩu đến
              </p>
              <p className="font-medium text-yellow-600 text-lg my-2">{email}</p>
              <p className="text-gray-600">
                Vui lòng kiểm tra hộp thư (bao gồm cả thư rác) và làm theo hướng dẫn.
              </p>
            </div>
            
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-yellow-500 to-red-600 hover:from-yellow-600 hover:to-red-700 shadow-md transition-colors duration-300"
            >
              <FaArrowLeft className="mr-2" /> Quay lại đăng nhập
            </Link>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <AuthMessage message={error} type="error" />
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-4 mb-6">
              <p className="text-sm text-yellow-700">
                Nhập địa chỉ email bạn đã dùng để đăng ký. Chúng tôi sẽ gửi cho bạn email với hướng dẫn để đặt lại mật khẩu.
              </p>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <FormInput
                  id="email"
                  name="email"
                  type="email"
                  label="Địa chỉ email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Nhập email của bạn"
                  icon={FaEnvelope}
                  required
                  className="bg-gray-50 border-0 rounded-lg shadow-sm"
                />
              </div>
              
              <div>
                <SubmitButton
                  isLoading={isLoading}
                  text="Gửi hướng dẫn đặt lại mật khẩu"
                  loadingText="Đang gửi..."
                  className="bg-gradient-to-r from-yellow-500 to-red-600 hover:from-yellow-600 hover:to-red-700 w-full py-3 rounded-lg shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] text-white font-medium"
                />
              </div>
            </form>
            
            <div className="text-center mt-6">
              <Link
                to="/login"
                className="inline-flex items-center text-sm font-medium text-yellow-600 hover:text-yellow-500 transition-colors"
              >
                <FaArrowLeft className="mr-1" /> Quay lại đăng nhập
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ForgotPasswordForm;