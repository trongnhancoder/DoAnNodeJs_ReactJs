import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
function Header() {
  return (
    <nav className="bg-gray-800 text-white  p-4 sticky top-0 z-10 shadow-lg flex">
      <Link to="/">
        <img src={logo} alt="Logo" className="w-16 h-16 mr-2" />
      </Link>
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center text-2xl font-bold tracking-tight 
          bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text hover:scale-105 transition-transform duration-300"
        >
          HaDiDi Restaurant
        </Link>

        <div className="space-x-6 text-sm md:text-base">
          <Link to="/" className="hover:text-gray-300 transition-colors">
            Trang chủ
          </Link>
          <Link to="/about" className="hover:text-gray-300 transition-colors">
            Giới thiệu
          </Link>
          <Link to="/menu" className="hover:text-gray-300 transition-colors">
            Thực đơn
          </Link>
          <Link
            to="/reservation"
            className="hover:text-gray-300 transition-colors"
          >
            Đặt lịch
          </Link>
          <Link to="/gallery" className="hover:text-gray-300 transition-colors">
            Thư viện
          </Link>
          <Link to="/review" className="hover:text-gray-300 transition-colors">
            Đánh giá
          </Link>

          <Link to="/contact" className="hover:text-gray-300 transition-colors">
            Liên hệ
          </Link>

          <Link to="/blog" className="hover:text-gray-300 transition-colors">
            Blog
          </Link>
          <Link to="/login" className="hover:text-gray-300 transition-colors">
            Đăng nhập
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
