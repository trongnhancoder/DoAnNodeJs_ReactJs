const ConfirmationStep = ({ formData, selectedItems, onConfirm, onBack }) => {
  const total = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="space-y-6">
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold mb-4">Thông tin đặt bàn</h3>
          <div className="grid grid-cols-2 gap-4 text-gray-600">
            <div>
              <p className="font-medium">Ngày:</p>
              <p>{formData.date}</p>
            </div>
            <div>
              <p className="font-medium">Thời gian:</p>
              <p>{formData.time}</p>
            </div>
            <div>
              <p className="font-medium">Số khách:</p>
              <p>{formData.guests} người</p>
            </div>
            <div>
              <p className="font-medium">Họ tên:</p>
              <p>{formData.name}</p>
            </div>
          </div>
          {formData.request && (
            <div className="mt-4">
              <p className="font-medium">Yêu cầu đặc biệt:</p>
              <p className="text-gray-600">{formData.request}</p>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Món đã chọn</h3>
          <div className="space-y-3">
            {selectedItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center py-2 border-b"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {Number(item.price).toLocaleString()} VND x {item.quantity}
                  </p>
                </div>
                <p className="font-semibold">
                  {Number(item.price * item.quantity).toLocaleString()} VND
                </p>
              </div>
            ))}
            <div className="flex justify-between items-center pt-4 font-bold">
              <p>Tổng cộng:</p>
              <p className="text-yellow-600 text-xl">
                {Number(total).toLocaleString()} VND
              </p>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 pt-6">
          <button
            onClick={onBack}
            className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 
                     transition-colors duration-300"
          >
            Quay lại
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 
                     transition-all duration-300 transform hover:scale-105"
          >
            Xác nhận đặt bàn
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationStep; 