import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css';
import React, { useState } from 'react';

// Import CSS
import '../../assets/styles/components/main.css';
import '../../assets/styles/components/util.css';
import '../../assets/styles/home/Home.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css';

// Import Hooks
import Product from '../main/Product';

// Import Components
import Category from '../../hooks/category/Category';
import FilterSearch from '../main/FilterSearch';

// Import API
import FetchAllProduct from '../../api/item/FetchAllProduct';
import TopRankedItems from '../../components/main/TopRankedItems';

// Function Aria
function Home() {
  const [activeCategory, setActiveCategory] = useState('*'); // 카테고리 상태
  const [activeFilter, setActiveFilter] = useState('sortByRecent'); // 필터 상태
  const [products, setProducts] = useState([]);

  const handleCategory = (category) => {
    setActiveCategory(category);
  };

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    console.log(`handleFilter에 입력된 filter: ${filter}`);
  };

  return (
    <>
      {/* Slider */}
      <section className="section-slide">
        <div className="wrap-slick1">
          <div className="slick1">
            <div
              className="item-slick1"
              style={{ backgroundImage: 'url(images/slide-01.jpg)' }}
            >
              <div className="container h-full">
                <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">
                  <span className="ltext-101 cl2 respon2">
                    Women Collection 2024
                  </span>
                  <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">
                    NEW SEASON
                  </h2>
                  <a
                    href="/shop"
                    className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner */}
      <TopRankedItems />

      {/* Product Overview */}
      <section className="bg0 p-t-23 p-b-140">
        <div className="container">
          <FetchAllProduct onItemFetch={setProducts} />
          <div className="p-b-10">
            <h3 className="ltext-103 cl5">Product Overview</h3>
          </div>

          {/* Category & Filter & Search */}
          <div className="flex-w flex-sb-m p-b-52">
            <Category
              activeCategory={activeCategory}
              handleCategory={handleCategory}
            />
            <FilterSearch
              activeFilter={activeFilter}
              handleFilter={handleFilter}
            />
          </div>

          {/* Product */}
          <Product
            products={(() => {
              return products;
            })()}
            activeCategory={activeCategory}
            activeFilter={activeFilter}
          />

          {/*Load more*/}
          <div className="flex-c-m flex-w w-full p-t-45">
            <a
              href="#"
              className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04"
            >
              Load More
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
