import React from 'react';

function CategorySelector({ categories, onSelectCategory }) {
  return (
    <div className="category-selector">
      <h2>Select a Category</h2>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategorySelector;