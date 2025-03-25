import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import FormInput from './FormInput';
import SocialLogin from './SocialLogin';
import AuthLayout from './AuthLayout';

function RegisterForm({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }
    if (!agreeTerms) {
      alert('Vui lòng đồng ý với điều khoản dịch vụ!');
      return;
    }
    console.log('Đăng ký:', formData);
    // Xử lý đăng ký
  };

  return (
    <AuthLayout 
      title="Tạo tài khoản" 
      subtitle="Đăng ký để trải nghiệm dịch vụ của chúng tôi"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Họ và tên"
          icon={<FaUser />}
          required
        />
        
        <FormInput
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          icon={<FaEnvelope />}
          required
        />
        
        <FormInput
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Số điện thoại"
          icon={<FaPhone />}
          required
        />
        
        <FormInput
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Mật khẩu"
          icon={<FaLock />}
          required
        />
        
        <FormInput
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Xác nhận mật khẩu"
          icon={<FaLock />}
          required
        />
        
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="text-gray-600">
              Tôi đồng ý với <a href="#" className="text-indigo-600 hover:underline">Điều khoản dịch vụ</a> và <a href="#" className="text-indigo-600 hover:underline">Chính sách bảo mật</a>
            </label>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          Đăng ký
        </motion.button>
      </form>
      
      <div className="mt-6">
        <SocialLogin />
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Đã có tài khoản?{' '}
          <button
            onClick={onSwitchToLogin}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Đăng nhập
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}

export default RegisterForm; 