import { useState } from 'react';
import LoginForm from '../components/LoginForm.jsx';

function Login() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">{isSignup ? 'Đăng ký' : 'Đăng nhập'}</h1>
        <LoginForm isSignup={isSignup} />
        <p className="text-center mt-4 text-gray-600">
          {isSignup ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'}{' '}
          <button onClick={() => setIsSignup(!isSignup)} className="text-blue-500 hover:underline">
            {isSignup ? 'Đăng nhập' : 'Đăng ký'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;