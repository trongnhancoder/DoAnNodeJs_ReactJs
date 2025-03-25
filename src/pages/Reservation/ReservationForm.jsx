function ReservationForm({ formData, handleChange, handleSubmit }) {
  return (
    <div>
      {" "}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Thông tin đặt lịch
        </h2>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Loại sự kiện
          </label>
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
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Ngày</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Giờ</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Số khách
          </label>
          <input
            type="number"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            placeholder="Số khách"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="1"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Họ tên</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Họ tên"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Yêu cầu đặc biệt
          </label>
          <textarea
            name="request"
            value={formData.request}
            onChange={handleChange}
            placeholder="Yêu cầu đặc biệt"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md transition-colors font-semibold"
        >
          Đặt ngay
        </button>
      </form>
    </div>
  );
}

export default ReservationForm;
