export default function Category({ activeCategory, handleCategoryChange }) {
  const categories = [
    { label: 'All', category: '*' },
    { label: '아우터', category: 'Outerwear' },
    { label: '상의', category: 'Tops' },
    { label: '바지', category: 'Bottoms' },
    { label: '치마', category: 'Skirts' },
    { label: '신발', category: 'shoes' },
    { label: '악세서리', category: 'accessory' },
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
