import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css';
import React, { useState } from 'react';

// Import CSS
import '../../assets/styles/components/main.css';
import '../../assets/styles/components/util.css';
import '../../assets/styles/Home/Home.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css';

// Import Hooks
import Product from '../main/Product';


// Import Components
import Category from '../../hooks/Category/Category';
import FilterSearch from '../main/FilterSearch';


// Import API
import FetchAllProduct from "../../api/item/FetchAllProduct";

// Function Aria
function Home() {
  const [activeCategory, setActiveCategory] = useState('*'); // 카테고리 상태
  const [activeFilter, setActiveFilter] = useState('sortByRecent'); // 필터 상태
  const [products, setProducts] = useState([]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    console.log(`handleFilterChange에 입력된 filter: ${filter}`);
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

      <div className="sec-banner bg0 p-t-80 p-b-50">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
              <div className="block1 wrap-pic-w">
                <img src="images/banner-01.jpg" alt="IMG-BANNER" />

                <a
                  href="../../../../../Downloads/cozastore-master/product.html"
                  className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                >
                  <div className="block1-txt-child1 flex-col-l">
                    <span className="block1-name ltext-102 trans-04 p-b-8">
                      Women
                    </span>

                    <span className="block1-info stext-102 trans-04">
                      Spring 2024
                    </span>
                  </div>

                  <div className="block1-txt-child2 p-b-4 trans-05">
                    <div className="block1-link stext-101 cl0 trans-09">
                      Shop Now
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/*Banner*/}
            <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
              <div className="block1 wrap-pic-w">
                <img src="images/banner-02.jpg" alt="IMG-BANNER" />

                <a
                  href="../../../../../Downloads/cozastore-master/product.html"
                  className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                >
                  <div className="block1-txt-child1 flex-col-l">
                    <span className="block1-name ltext-102 trans-04 p-b-8">
                      Men
                    </span>

                    <span className="block1-info stext-102 trans-04">
                      Spring 2024
                    </span>
                  </div>

                  <div className="block1-txt-child2 p-b-4 trans-05">
                    <div className="block1-link stext-101 cl0 trans-09">
                      Shop Now
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
              <div className="block1 wrap-pic-w">
                <img src="images/banner-03.jpg" alt="IMG-BANNER" />

                <a
                  href="../../../../../Downloads/cozastore-master/product.html"
                  className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                >
                  <div className="block1-txt-child1 flex-col-l">
                    <span className="block1-name ltext-102 trans-04 p-b-8">
                      Accessories
                    </span>

                    <span className="block1-info stext-102 trans-04">
                      New Trend
                    </span>
                  </div>

                  <div className="block1-txt-child2 p-b-4 trans-05">
                    <div className="block1-link stext-101 cl0 trans-09">
                      Shop Now
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Overview */}
      <section className="bg0 p-t-23 p-b-140">
        <div className="container">
          <FetchAllProduct onItemFetch={ setProducts }/>
          <div className="p-b-10">
            <h3 className="ltext-103 cl5">Product Overview</h3>
          </div>

          {/* Category & Filter & Search */}
          <div className="flex-w flex-sb-m p-b-52">
            <Category
              activeCategory={activeCategory}
              handleCategoryChange={handleCategoryChange}
            />
            <FilterSearch
              activeFilter={activeFilter}
              handleFilterChange={handleFilterChange}
            />
          </div>

          {/* Product */}
          <Product
              products={(() => {
                console.log("Passing products to Product:", products);
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
