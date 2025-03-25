import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthLayout from './AuthLayout';

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError('Vui lòng nhập email của bạn');
      return;
    }

    if (!validateEmail(email)) {
      setError('Email không hợp lệ');
      return;
    }

    // Giả lập gửi yêu cầu đặt lại mật khẩu
    console.log('Gửi yêu cầu đặt lại mật khẩu cho email:', email);
    setSubmitted(true);

    // Sau 3 giây, chuyển hướng về trang đăng nhập
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  return (
    <AuthLayout
      title="Quên mật khẩu"
      subtitle="Đã nhớ mật khẩu?"
      linkText="Đăng nhập"
      linkTo="/login"
    >
      {submitted ? (
        <div className="mt-8 text-center">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email của bạn. Vui lòng kiểm tra hộp thư.
          </div>
          <p className="text-gray-600 mt-4">
            Bạn sẽ được chuyển hướng về trang đăng nhập sau vài giây...
          </p>
        </div>
      ) : (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
              placeholder="Nhập email đã đăng ký"
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full flex justify-center py-3 px-6 border border-transparent text-base font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-md transition-colors duration-300"
            >
              Gửi yêu cầu đặt lại mật khẩu
            </motion.button>
          </div>

          <div className="text-sm text-center mt-4">
            <p className="text-gray-600">
              Chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu đến email của bạn.
            </p>
          </div>
        </form>
      )}
    </AuthLayout>
  );
};

export default ForgotPasswordForm; 