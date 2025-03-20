function MenuItem({ item }) {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow">
      <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
        {/* <p className="text-gray-600 text-sm mt-1">{item.ingredients.join(', ')}</p> */}
        <p className="text-green-600 font-semibold mt-2">{item.price.toLocaleString()} VND</p>
      </div>
    </div>
  );
}

export default MenuItem;