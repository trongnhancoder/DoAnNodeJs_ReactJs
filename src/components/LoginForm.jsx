import { useState } from 'react';

function LoginForm({ isSignup }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${isSignup ? 'Đăng ký' : 'Đăng nhập'} thành công (mock)!`);
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isSignup && (
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Họ tên"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      )}
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Mật khẩu"
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition-colors"
      >
        {isSignup ? 'Đăng ký' : 'Đăng nhập'}
      </button>
    </form>
  );
}

export default LoginForm;