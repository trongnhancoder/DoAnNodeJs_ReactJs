function About() {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto p-6">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Giới thiệu về chúng tôi</h1>
          <div className="prose max-w-none text-gray-700">
            <p>Nhà hàng XYZ được thành lập năm 2010 với sứ mệnh mang đến trải nghiệm ẩm thực đẳng cấp. Chúng tôi tự hào có đội ngũ đầu bếp tài năng và không gian sang trọng, lý tưởng cho mọi sự kiện từ tiệc sinh nhật đến hội nghị.</p>
            <h2 className="text-2xl font-semibold mt-6">Đội ngũ của chúng tôi</h2>
            <p>Gặp gỡ các đầu bếp và quản lý đã làm nên thương hiệu XYZ: Chef Minh, Quản lý Lan, và nhiều thành viên khác.</p>
            <img src="https://images.unsplash.com/photo-1577219491135-2" alt="Đội ngũ" className="w-full h-64 object-cover rounded-lg mt-4 shadow-lg" />
          </div>
        </div>
      </div>
    );
  }
  
  export default About;