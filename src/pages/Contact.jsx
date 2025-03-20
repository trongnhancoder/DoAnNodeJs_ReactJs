function Contact() {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto p-6">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Liên hệ với chúng tôi</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 text-gray-700">
              <p className="text-lg"><strong>Địa chỉ:</strong> 123 Đường Ẩm Thực, TP. HCM</p>
              <p className="text-lg"><strong>Điện thoại:</strong> 0909 123 456</p>
              <p className="text-lg"><strong>Email:</strong> contact@nhahangxyz.com</p>
            </div>
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.669614422678!2d106.62966331474896!3d10.759917392319746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38f8d75a27%3A0x656c833ba6e2b76e!2sHo+Chi+Minh+City!5e0!3m2!1sen!2s!4v1536848738288"
                width="100%"
                height="300"
                className="border-0 rounded-lg shadow-lg"
                allowFullScreen
                title="Google Maps"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Contact;