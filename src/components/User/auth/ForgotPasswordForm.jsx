// src/components/auth/ForgotPasswordForm.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPaperPlane, FaArrowLeft } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import SubmitButton from './SubmitButton';

const ForgotPasswordForm = ({ onSubmit, isLoading }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    let timer;
    if (isSubmitted && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isSubmitted, countdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Vui lòng nhập email');
      return;
    }

    try {
      // Đợi kết quả từ onSubmit
      const success = await onSubmit(email);
      
      // Chỉ set isSubmitted khi onSubmit trả về true
      if (success) {
        setIsSubmitted(true);
        setCountdown(60);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20 
        }}
        className="mb-8"
      >
        <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-5 rounded-full shadow-lg shadow-orange-200">
          <FaPaperPlane className="h-10 w-10 text-white" />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="absolute top-4 left-4">
            <Link
              to="/login"
              className="flex items-center text-gray-600 hover:text-orange-500 transition-colors duration-200"
            >
              <FaArrowLeft className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Quay lại</span>
            </Link>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-8"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    Quên mật khẩu?
                  </h2>
                  <p className="text-gray-600">
                    Đừng lo lắng! Chỉ cần nhập email của bạn và chúng tôi sẽ gửi link đặt lại mật khẩu.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email của bạn
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="h-5 w-5 text-orange-500" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl
                                 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                                 transition-all duration-200 ease-in-out
                                 text-gray-900 placeholder-gray-400"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>

                  <SubmitButton 
                    isLoading={isLoading}
                    text="Gửi link đặt lại mật khẩu"
                    loadingText="Đang gửi..."
                    icon={<FaPaperPlane className="h-5 w-5" />}
                  />

                  <div className="text-center mt-6">
                    <Link
                      to="/login"
                      className="inline-flex items-center justify-center px-4 py-2 
                               text-sm font-medium text-gray-700 hover:text-orange-500 
                               transition-colors duration-200"
                    >
                      <FaArrowLeft className="h-4 w-4 mr-2" />
                      Quay lại đăng nhập
                    </Link>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mx-auto w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 
                           rounded-full flex items-center justify-center mb-6 shadow-inner"
                >
                  <FaPaperPlane className="h-10 w-10 text-orange-500" />
                </motion.div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Email đã được gửi!
                </h3>
                <div className="space-y-4 mb-8">
                  <p className="text-gray-600">
                    Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email:
                    <span className="font-medium text-gray-900 block mt-1">{email}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Vui lòng kiểm tra hộp thư của bạn (bao gồm cả thư spam).
                  </p>
                  {countdown > 0 && (
                    <p className="text-sm text-orange-600">
                      Link sẽ hết hạn sau {countdown} giây
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/login"
                      className="inline-flex items-center justify-center px-6 py-3 w-full
                               rounded-xl text-base font-medium text-white
                               bg-gradient-to-r from-orange-500 to-amber-500 
                               hover:from-orange-600 hover:to-amber-600
                               transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <FaArrowLeft className="h-4 w-4 mr-2" />
                      Quay lại đăng nhập
                    </Link>
                  </motion.div>

                  {countdown === 0 && (
                    <button
                      onClick={() => {
                        handleSubmit({ preventDefault: () => {} });
                        setCountdown(60);
                      }}
                      className="text-orange-500 hover:text-orange-600 text-sm font-medium
                               transition-colors duration-200"
                    >
                      Gửi lại email
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ForgotPasswordForm;