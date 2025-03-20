import { Link } from 'react-router-dom';
import video from '../assets/restaurant-video.mp4'; // Tải từ Pexels

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative">
        <video autoPlay loop muted className="w-full h-[500px] object-cover">
          <source src={video} type="video/mp4" />
        </video>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg text-blue-600">Hadidi Restaurant Xin Chào</h1>
          <div className="space-x-4">
            <Link to="/reservation" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition-colors">Đặt lịch</Link>
            <Link to="/menu" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-md transition-colors">Thực đơn</Link>
            <Link to="/contact" className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg shadow-md transition-colors">Liên hệ</Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-6">
        <img src="https://images.unsplash.com/photo-1517248135467-2" alt="Không gian nhà hàng" className="w-full h-64 object-cover rounded-lg shadow-lg" />
      </div>
    </div>
  );
}

export default Home;