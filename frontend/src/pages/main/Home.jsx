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

// Function Aria
function Home() {
  const [activeCategory, setActiveCategory] = useState('*'); // 카테고리 상태
  const [activeFilter, setActiveFilter] = useState('sortByRecent'); // 필터 상태

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    console.log(`handleFilterChange에 입력된 filter: ${filter}`);
  };

  const products = [
    {
      id: 1,
      name: 'Esprit Ruffle Shirt',
      category: 'women',
      price: '20,000',
      image: 'images/product-01.jpg',
    },
    {
      id: 2,
      name: 'Herschel supply',
      category: 'women',
      price: '40,000',
      image: 'images/product-02.jpg',
    },
    {
      id: 3,
      name: 'Only Check Trouser',
      category: 'men',
      price: '35,000',
      image: 'images/product-03.jpg',
    },
    {
      id: 4,
      name: 'Classic Trench Coat',
      category: 'women',
      price: '90,000',
      image: 'images/product-04.jpg',
    },
    {
      id: 5,
      name: 'Front Pocket Jumper',
      category: 'women',
      price: '45,000',
      image: 'images/product-05.jpg',
    },
    {
      id: 6,
      name: 'Vintage Inspired Classic',
      category: 'watches',
      price: '120,000',
      image: 'images/product-06.jpg',
    },
    {
      id: 7,
      name: 'Shirt in Stretch Cotton',
      category: 'women',
      price: '70,000',
      image: 'images/product-07.jpg',
    },
    {
      id: 8,
      name: 'Pieces Metallic Printed',
      category: 'women',
      price: '25,000',
      image: 'images/product-08.jpg',
    },
    {
      id: 9,
      name: 'Converse All Star Hi Plimsolls',
      category: 'shoes',
      price: '95,000',
      image: 'images/product-09.jpg',
    },
    {
      id: 10,
      name: 'Femme T-Shirt In Stripe',
      category: 'women',
      price: '35,000',
      image: 'images/product-10.jpg',
    },
    {
      id: 11,
      name: 'Herschel supply',
      category: 'men',
      price: '80,000',
      image: 'images/product-11.jpg',
    },
    {
      id: 12,
      name: 'Herschel supply',
      category: 'men',
      price: '80,000',
      image: 'images/product-12.jpg',
    },
    {
      id: 13,
      name: 'T-Shirt with Sleeve',
      category: 'women',
      price: '25,000',
      image: 'images/product-13.jpg',
    },
    {
      id: 14,
      name: 'Pretty Little Thing',
      category: 'women',
      price: '70,000',
      image: 'images/product-14.jpg',
    },
    {
      id: 15,
      name: 'Mini Silver Mesh Watch',
      category: 'watches',
      price: '110,000',
      image: 'images/product-15.jpg',
    },
    {
      id: 16,
      name: 'Square Neck Back',
      category: 'women',
      price: '35,000',
      image: 'images/product-16.jpg',
    },
  ];

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
                      Spring 2018
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
                      Spring 2018
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
            products={products}
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
