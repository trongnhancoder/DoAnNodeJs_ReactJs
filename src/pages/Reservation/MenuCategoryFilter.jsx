function MenuCategoryFilter({ categories, selectedCategory, onCategoryChange }) {
    return (
      <div className="flex justify-center mb-4 space-x-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    );
  }
  
  export default MenuCategoryFilter;