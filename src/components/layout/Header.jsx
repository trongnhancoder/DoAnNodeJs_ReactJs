import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/logo.png";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Xử lý hiệu ứng scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  // Kiểm tra nếu link đang active
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Tính toán chiều cao của header
  const headerHeight = isScrolled ? "h-16" : "h-20";
  
  return (
    <>
      {/* Phần tử tạo khoảng trống bằng chiều cao của header */}
      <div className={headerHeight}></div>
      
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white shadow-md py-2 text-gray-800 h-16" 
            : "bg-gradient-to-r from-amber-700/80 to-amber-900/80 backdrop-blur-sm py-4 text-white h-20"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src={logo} 
              alt="HaDiDi Restaurant Logo" 
              className={`transition-all duration-300 ${isScrolled ? "h-10" : "h-12"}`} 
            />
            <span 
              className={`font-bold text-2xl tracking-tight transition-colors duration-300 ${
                isScrolled 
                  ? "text-amber-600" 
                  : "text-white"
              }`}
            >
              HaDiDi
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavLink to="/" isActive={isActive("/")} isScrolled={isScrolled}>
              Trang chủ
            </NavLink>
            
            <NavLink to="/about" isActive={isActive("/about")} isScrolled={isScrolled}>
              Giới thiệu
            </NavLink>
            
            <NavLink to="/menu" isActive={isActive("/menu")} isScrolled={isScrolled}>
              Thực đơn
            </NavLink>
            
            <NavLink to="/reservation" isActive={isActive("/reservation")} isScrolled={isScrolled}>
              Đặt lịch
            </NavLink>
            
            <NavLink to="/gallery" isActive={isActive("/gallery")} isScrolled={isScrolled}>
              Tiệc Của Bạn
            </NavLink>
            
            <NavLink to="/review" isActive={isActive("/review")} isScrolled={isScrolled}>
              Đánh giá
            </NavLink>
            
            <NavLink to="/contact" isActive={isActive("/contact")} isScrolled={isScrolled}>
              Liên hệ
            </NavLink>
            
            <Link 
              to="/login" 
              className={`ml-2 px-4 py-2 rounded-full flex items-center transition-all duration-300 ${
                isScrolled
                  ? "bg-amber-600 text-white hover:bg-amber-700"
                  : "bg-white text-amber-700 hover:bg-gray-100"
              }`}
            >
              <FaUser className="mr-2" />
              <span>Đăng nhập</span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="lg:hidden text-2xl focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white shadow-xl absolute w-full left-0 top-full z-50 overflow-hidden transition-all duration-300 max-h-screen">
            <div className="container mx-auto px-4 py-3">
              <div className="flex flex-col space-y-1">
                <MobileNavLink to="/" isActive={isActive("/")} onClick={toggleMobileMenu}>
                  Trang chủ
                </MobileNavLink>
                
                <MobileNavLink to="/about" isActive={isActive("/about")} onClick={toggleMobileMenu}>
                  Giới thiệu
                </MobileNavLink>
                
                <MobileNavLink to="/menu" isActive={isActive("/menu")} onClick={toggleMobileMenu}>
                  Thực đơn
                </MobileNavLink>
                
                <MobileNavLink to="/reservation" isActive={isActive("/reservation")} onClick={toggleMobileMenu}>
                  Đặt lịch
                </MobileNavLink>
                
                <MobileNavLink to="/gallery" isActive={isActive("/gallery")} onClick={toggleMobileMenu}>
                  Tiệc Của Bạn
                </MobileNavLink>
                
                <MobileNavLink to="/review" isActive={isActive("/review")} onClick={toggleMobileMenu}>
                  Đánh giá
                </MobileNavLink>
                
                <MobileNavLink to="/contact" isActive={isActive("/contact")} onClick={toggleMobileMenu}>
                  Liên hệ
                </MobileNavLink>
                
                <Link 
                  to="/login" 
                  className="flex items-center py-3 px-4 rounded-lg bg-amber-600 text-white mt-2"
                  onClick={toggleMobileMenu}
                >
                  <FaUser className="mr-2" />
                  <span>Đăng nhập</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

// NavLink component for desktop
function NavLink({ children, to, isActive, isScrolled }) {
  return (
    <Link
      to={to}
      className={`relative px-3 py-2 font-medium text-sm rounded-lg transition-all duration-300 ${
        isActive
          ? isScrolled
            ? "text-amber-600 bg-amber-50"
            : "text-white bg-amber-800/30"
          : isScrolled
            ? "text-gray-800 hover:bg-gray-100"
            : "text-white/90 hover:text-white hover:bg-white/10"
      }`}
    >
      {children}
      {isActive && (
        <span className={`absolute bottom-0 left-0 w-full h-0.5 ${
          isScrolled ? "bg-amber-500" : "bg-white"
        }`}>
        </span>
      )}
    </Link>
  );
}

// NavLink component for mobile
function MobileNavLink({ children, to, isActive, onClick }) {
  return (
    <Link
      to={to}
      className={`py-3 px-4 ${
        isActive
          ? "text-amber-600 bg-amber-50 font-medium rounded-lg"
          : "text-gray-700 hover:bg-gray-50 hover:text-amber-600"
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export default Header;