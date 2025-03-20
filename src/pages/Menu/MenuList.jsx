import MenuItem from './MenuItem.jsx';

function MenuList({ menuItems }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {menuItems.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default MenuList;