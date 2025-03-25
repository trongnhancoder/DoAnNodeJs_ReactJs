import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthLayout = ({ children, title, subtitle, linkText, linkTo }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{title}</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {subtitle}{' '}
            <Link to={linkTo} className="font-medium text-primary-600 hover:text-primary-500">
              {linkText}
            </Link>
          </p>
        </div>
        
        {children}
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} HaDiDi Restaurant. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout; 