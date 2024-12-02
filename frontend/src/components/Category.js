import { useState } from 'react';

export default function Category({ handleFilterChange }) {
  const categories = [
    { label: 'All Products', filter: '*' },
    { label: 'Women', filter: 'women' },
    { label: 'Men', filter: 'men' },
    { label: 'Bag', filter: 'bag' },
    { label: 'Shoes', filter: 'shoes' },
    { label: 'Watches', filter: 'watches' },
  ];

  return (
    <div className="flex-w flex-l-m filter-tope-group m-tb-10">
      {categories.map((category) => (
        <button
          key={category.filter}
          className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 
              ${handleFilterChange === category.filter ? 'how-active1' : ''}`}
          onClick={() => handleFilterChange(category.filter)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
