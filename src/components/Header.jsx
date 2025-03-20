import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="bg-gray-800 text-white p-4 sticky top-0 z-10 shadow-lg flex">
      <img src="../assets/logo.png" alt="Logo" className="w-16 h-16 mr-2" />
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center text-2xl font-bold tracking-tight"
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
