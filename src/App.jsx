import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import components chung
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Import các trang chính
import Home from './pages/layout/Home';
import About from './pages/About/About';
import Menu from './pages/Menu/Menu';
import Contact from './pages/Contact/Contact';
import Reservation from './pages/Reservation/Reservation';
import BookingHistory from './pages/BookingHistory/BookingHistory';
import CustomerReview from './pages/Review/CustomerReview';

// Import các components Auth
import Login from './components/User/auth/LoginForm';
import Register from './components/User/auth/RegisterForm';
import ForgotPassword from './components/User/auth/ForgotPasswordForm';

// Import Admin pages
import Dashboard from './pages/admin/Dashboard';
import UsersPage from './pages/admin/users';
import MenuPage from './pages/admin/menu';
import OrdersPage from './pages/admin/orders';
import SettingsPage from './pages/admin/settings';

// Import trang lỗi
import NotFound from './pages/layout/NotFound';

function App() {
  
  const isAdminRoute = (pathname) => {
    return pathname.startsWith('/admin');
  };

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
        
        {/* Điều kiện hiển thị Header và Footer */}
        {!isAdminRoute(window.location.pathname) && <Header />}
        
        {/* Main content */}
        <main className="flex-grow">
          <Routes>
            {/* Trang chính */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/BookingHistory" element={<BookingHistory />} />
            <Route path="/CustomerReview" element={<CustomerReview />} />
            {/* <Route path="/booking-details/:id" element={<BookingDetails />} /> */}
           
            
            {/* Trang Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Routes Admin */}
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/users" element={<UsersPage />} />
            <Route path="/admin/menu" element={<MenuPage />} />
            <Route path="/admin/orders" element={<OrdersPage />} />
           
            <Route path="/admin/settings" element={<SettingsPage />} />
            
            {/* Trang lỗi - comment các Route tạm thời chưa cần sử dụng */}
            {/* <Route path="/error/server" element={<ServerError />} /> */}
            {/* <Route path="/error/unauthorized" element={<UnauthorizedError />} /> */}
            
            {/* Chuyển hướng nếu URL không hợp lệ */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>
        
        {/* Điều kiện hiển thị Footer */}
        {!isAdminRoute(window.location.pathname) && <Footer />}
      </div>
    </Router>
  );
}

export default App;