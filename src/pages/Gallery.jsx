import { galleryData } from '../data/galleryData.JS';

function Gallery() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Thư viện hình ảnh & video</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryData.map(item => (
            <div key={item.id} className="relative group rounded-lg shadow-lg overflow-hidden">
              {item.type === 'image' ? (
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <video controls className="w-full h-64 object-cover">
                  <source src={item.src} type="video/mp4" />
                </video>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
                <p className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;