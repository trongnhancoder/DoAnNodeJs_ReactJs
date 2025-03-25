import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function FormInput({ 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder, 
  icon, 
  required = false,
  autoComplete = "on"
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  
  return (
    <div className="relative mb-4">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
        {icon}
      </div>
      
      <input
        type={isPassword && showPassword ? 'text' : type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
      />
      
      {isPassword && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  );
}

export default FormInput; 