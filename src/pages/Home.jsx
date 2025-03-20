import { Link } from "react-router-dom";
import video from "../assets/restaurant-video.mp4"; // Tải từ Pexels

function Home() {
  return (
    <div className="w-full h-[500px]">
      <div className="relative">
        <video autoPlay loop muted className="w-full h-[536px] object-cover">
          <source src={video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-white/60 bg-opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-pulse">
            HaDiDi Restaurant
          </h1>
          <p className="text-xl md:text-2xl text-red-800 font-medium">
            Hội Nghị - Tiệc Cưới - Sự Kiện
          </p>
          <p className="text-lg md:text-xl text-black font-bold">
            Nơi Tôn Vinh Sự Kiện Trọng Đại Của Bạn
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/reservation"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition-colors"
            >
              Đặt lịch
            </Link>
            <Link
              to="/menu"
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-md transition-colors"
            >
              Thực đơn
            </Link>
            <Link
              to="/contact"
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg shadow-md transition-colors"
            >
              Liên hệ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;                                                                                    
