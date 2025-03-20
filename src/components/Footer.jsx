import facebookIcon from "../assets/facebook.png";
import instagramIcon from "../assets/instagram.png";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-8 shadow-inner">
      <div className="container mx-auto text-center space-y-4">
        {/* Thông tin liên hệ */}
        <div>
          <h2 className="text-lg font-bold">Liên hệ với chúng tôi</h2>
          <p className="text-sm">Địa chỉ: 475 Đường Điện Biên Phủ, Quận Bình Thạnh, TP.HCM</p>
          <p className="text-sm">
            Số điện thoại:{" "}
            <a
              href="tel:   +84 938315769"
              className="text-blue-400 hover:underline"
            >
              +84 938315769
            </a>
          </p>
          <p className="text-sm">
            Email:{" "}
            <a
              href="mailto: nhannguyen311003@gmail.com"
              className="text-blue-400 hover:underline"
            >
              nhannguyen311003@gmail.com
            </a>
          </p>
        </div>

        {/* Mạng xã hội */}
        <div className="flex justify-center space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <img
              src={facebookIcon}
              alt="Facebook"
              className="w-8 h-8 object-contain"
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <img
              src={instagramIcon}
              alt="Instagram"
              className="w-8 h-8 object-contain"
            />
          </a>
        </div>

        {/* Bản quyền */}
        <p className="text-sm">©2025 HaDiDi Restaurant. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
