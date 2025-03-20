import { blogData } from '../data/blogData.js';

function Blog() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Blog & Tin tức</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogData.map(post => (
            <div key={post.id} className="border rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
                <p className="text-gray-600 mt-2">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;