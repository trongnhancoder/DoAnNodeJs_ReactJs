import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import components chung
import Header from './components/Header';
import Footer from './components/Footer';

// Import các trang chính
import Home from './pages/Home';
import About from './pages/About/About';
import Menu from './pages/Menu/Menu';
import Contact from './pages/Contact/Contact';
import Reservation from './pages/Reservation/Reservation';
import Blog from './pages/Blog';

// Import các components Auth
import Login from './components/auth/LoginForm';
import Register from './components/auth/RegisterForm';
import ForgotPassword from './components/auth/ForgotPasswordForm';

// Import trang lỗi
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Toast notifications - cấu hình chung cho toàn ứng dụng */}
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="rounded-lg shadow-lg bg-white text-gray-800"
          progressClassName="bg-yellow-500"
        />
        
        {/* Header */}
        <Header />
        
        {/* Main content */}
        <main className="flex-grow">
          <Routes>
            {/* Trang chính */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/blog" element={<Blog />} />
            
            {/* Trang Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Trang lỗi - comment các Route tạm thời chưa cần sử dụng */}
            {/* <Route path="/error/server" element={<ServerError />} /> */}
            {/* <Route path="/error/unauthorized" element={<UnauthorizedError />} /> */}
            
            {/* Chuyển hướng nếu URL không hợp lệ */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;