import { useState } from 'react';

export default function Category({ activeCategory, handleCategoryChange }) {
  const categories = [
    { label: 'All Products', category: '*' },
    { label: 'Women', category: 'women' },
    { label: 'Men', category: 'men' },
    { label: 'Bag', category: 'bag' },
    { label: 'Shoes', category: 'shoes' },
    { label: 'Watches', category: 'watches' },
  ];

  return (
    <div className="flex-w flex-l-m filter-tope-group m-tb-10">
      {categories.map((category) => (
        <button
          key={category.category}
          className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 
              ${activeCategory === category.category ? 'how-active1' : ''}`}
          onClick={() => handleCategoryChange(category.category)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
