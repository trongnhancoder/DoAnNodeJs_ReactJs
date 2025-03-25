import facebookIcon from "../assets/facebook.png";
import instagramIcon from "../assets/instagram.png";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0">
          {/* Logo và Thông tin */}
          <div className="text-center md:text-left md:w-1/3">
            <div className="mb-4">
              <img src={logo} alt="HaDiDi Logo" className="h-16 mx-auto md:mx-0" />
            </div>
            <p className="text-gray-300 text-sm mb-2">
              Nhà hàng chúng tôi mang đến trải nghiệm ẩm thực độc đáo và phong cách phục vụ chuyên nghiệp.
            </p>
            <p className="text-yellow-400 font-semibold">
              "Hương vị tinh tế - Không gian sang trọng"
            </p>
          </div>

          {/* Thông tin liên hệ */}
          <div className="text-center md:text-left md:w-1/3">
            <h2 className="text-xl font-bold mb-3 text-yellow-400">Liên hệ với chúng tôi</h2>
            <div className="space-y-2">
              <p className="text-gray-300 hover:text-white transition-colors flex items-center justify-center md:justify-start">
                <i className="fas fa-map-marker-alt mr-2"></i>
               Address: 475 Đường Điện Biên Phủ, Quận Bình Thạnh, TP.HCM
              </p>
              <p>
                <a href="tel:+84938315769" 
                   className="text-gray-300 hover:text-white transition-colors flex items-center justify-center md:justify-start">
                  <i className="fas fa-phone mr-2"></i>
                 HotLine: +84 938315769
                </a>
              </p>
              <p>
                <a href="mailto:nhannguyen311003@gmail.com"
                   className="text-gray-300 hover:text-white transition-colors flex items-center justify-center md:justify-start">
                  <i className="fas fa-envelope mr-2"></i>
               Email: Nhannguyen311003@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Mạng xã hội */}
          <div className="text-center md:text-right md:w-1/3">
            <h2 className="text-xl font-bold mb-3 text-yellow-400">Kết nối với chúng tôi</h2>
            <div className="flex justify-center md:justify-end space-x-4">
              <a href="https://facebook.com"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="transform hover:scale-110 transition-transform duration-300">
                <img src={facebookIcon}
                     alt="Facebook"
                     className="w-8 h-8 object-contain" />
              </a>
              <a href="https://instagram.com"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="transform hover:scale-110 transition-transform duration-300">
                <img src={instagramIcon}
                     alt="Instagram"
                     className="w-8 h-8 object-contain" />
              </a>
            </div>
          </div>
        </div>

        {/* Bản quyền */}
        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p className="text-sm text-gray-400">
            ©2025 HaDiDi Restaurant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;