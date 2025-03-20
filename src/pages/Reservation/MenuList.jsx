import MenuItem from './MenuItem.jsx';

function MenuList({ menuItems, handleItemIncrement, handleItemDecrement, selectedItems }) {
  return (
    <div className="space-y-4">
      {menuItems.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          handleItemIncrement={handleItemIncrement}
          handleItemDecrement={handleItemDecrement}
          quantity={selectedItems[item.id]?.quantity || 0}
        />
      ))}
    </div>
  );
}

export default MenuList;