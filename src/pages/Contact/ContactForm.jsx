// src/components/ContactForm.jsx
import { useState } from 'react';
import { toast } from 'react-toastify';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Giả lập gửi form (thay thế bằng API call thực tế)
      setTimeout(() => {
        toast.success('Cảm ơn bạn đã liên hệ với chúng tôi!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setLoading(false);
      }, 1500);
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Gửi thông tin</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Họ tên</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Số điện thoại</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Chủ đề</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Nội dung</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200 resize-none"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-md text-white font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300 ${
            loading ? 'bg-yellow-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'
          }`}
        >
          {loading ? 'Đang gửi...' : 'Gửi tin nhắn'}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;