import MenuItem from '../components/MenuItem.jsx';
import { menuData } from '../data/menuData.js';

function Menu() {
  const categories = ['Món khai vị', 'Món chính', 'Tráng miệng', 'Nước uống'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Thực đơn</h1>
        {categories.map(category => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {menuData
                .filter(item => item.category === category)
                .map(item => (
                  <MenuItem key={item.id} item={item} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;