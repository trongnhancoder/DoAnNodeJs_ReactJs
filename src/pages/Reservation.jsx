import { useState } from 'react';

function Reservation() {
  const [formData, setFormData] = useState({
    date: '', time: '', guests: '', name: '', request: '', eventType: 'Đặt bàn',
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Đặt lịch thành công (mock)!');
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Đặt lịch trực tuyến</h1>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4 bg-white p-6 rounded-lg shadow-lg">
          <select
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Đặt bàn">Đặt bàn</option>
            <option value="Sinh nhật">Sinh nhật</option>
            <option value="Cưới">Cưới</option>
            <option value="Hội nghị">Hội nghị</option>
          </select>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            placeholder="Số khách"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Họ tên"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            name="request"
            value={formData.request}
            onChange={handleChange}
            placeholder="Yêu cầu đặc biệt"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition-colors"
          >
            Đặt ngay
          </button>
        </form>
      </div>
    </div>
  );
}

export default Reservation;