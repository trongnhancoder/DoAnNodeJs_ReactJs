import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import FormInput from './FormInput';
import SocialLogin from './SocialLogin';
import AuthLayout from './AuthLayout';

function LoginForm({ onSwitchToRegister, onSwitchToForgot }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Đăng nhập:', formData, 'Ghi nhớ:', rememberMe);
    // Xử lý đăng nhập
  };

  return (
    <AuthLayout 
      title="Đăng nhập" 
      subtitle="Chào mừng quay trở lại! Vui lòng đăng nhập để tiếp tục."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email của bạn"
          icon={<FaEnvelope />}
          required
          autoComplete="email"
        />
        
        <FormInput
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Mật khẩu"
          icon={<FaLock />}
          required
          autoComplete="current-password"
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Ghi nhớ đăng nhập
            </label>
          </div>
          
          <button
            type="button"
            onClick={onSwitchToForgot}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Quên mật khẩu?
          </button>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          Đăng nhập
        </motion.button>
      </form>
      
      <div className="mt-6">
        <SocialLogin />
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Chưa có tài khoản?{' '}
          <button
            onClick={onSwitchToRegister}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Đăng ký ngay
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}

export default LoginForm; 