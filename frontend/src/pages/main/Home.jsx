import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import '../../assets/styles/main.css';
import '../../assets/styles/util.css';
import Category from '../../components/Category';
import FilterSearch from '../../components/FilterSearch';
import Product from '../../components/Product';

function Home() {
  // const { isCartOpen, toggleCart } = useCartAndSidebar();
  const [activeFilter, setActiveFilter] = useState('*'); // 메인 화면의 카테고리 중 filter의 상태

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  // 임시 제품
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
                    Women Collection 2018
                  </span>
                  <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">
                    NEW SEASON
                  </h2>
                  <Link
                    to="/shop"
                    className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04"
                  >
                    Shop Now
                  </Link>
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

                <Link
                  to="../../../../../Downloads/cozastore-master/product.html"
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
                </Link>
              </div>
            </div>

            {/*Banner*/}
            <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
              <div className="block1 wrap-pic-w">
                <img src="images/banner-02.jpg" alt="IMG-BANNER" />

                <Link
                  to="../../../../../Downloads/cozastore-master/product.html"
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
                </Link>
              </div>
            </div>

            <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
              <div className="block1 wrap-pic-w">
                <img src="images/banner-03.jpg" alt="IMG-BANNER" />

                <Link
                  to="../../../../../Downloads/cozastore-master/product.html"
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
                </Link>
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
            <Category handleFilterChange={handleFilterChange} />
            <FilterSearch />
          </div>

          {/* 제품 */}
          <Product products={products} activeFilter={activeFilter} />

          {/*Load more*/}
          <div className="flex-c-m flex-w w-full p-t-45">
            <Link
              to="#"
              className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04"
            >
              Load More
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg3 p-t-75 p-b-32">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-3 p-b-50">
              <h4 className="stext-301 cl0 p-b-30">Categories</h4>

              <ul>
                <li className="p-b-10">
                  <Link to="#" className="stext-107 cl7 hov-cl1 trans-04">
                    Women
                  </Link>
                </li>

                <li className="p-b-10">
                  <Link to="#" className="stext-107 cl7 hov-cl1 trans-04">
                    Men
                  </Link>
                </li>

                <li className="p-b-10">
                  <Link to="#" className="stext-107 cl7 hov-cl1 trans-04">
                    Shoes
                  </Link>
                </li>

                <li className="p-b-10">
                  <Link to="#" className="stext-107 cl7 hov-cl1 trans-04">
                    Watches
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-sm-6 col-lg-3 p-b-50">
              <h4 className="stext-301 cl0 p-b-30">Help</h4>

              <ul>
                <li className="p-b-10">
                  <Link to="#" className="stext-107 cl7 hov-cl1 trans-04">
                    Track Order
                  </Link>
                </li>

                <li className="p-b-10">
                  <Link to="#" className="stext-107 cl7 hov-cl1 trans-04">
                    Returns
                  </Link>
                </li>

                <li className="p-b-10">
                  <Link to="#" className="stext-107 cl7 hov-cl1 trans-04">
                    Shipping
                  </Link>
                </li>

                <li className="p-b-10">
                  <Link to="#" className="stext-107 cl7 hov-cl1 trans-04">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-sm-6 col-lg-3 p-b-50">
              <h4 className="stext-301 cl0 p-b-30">GET IN TOUCH</h4>

              <p className="stext-107 cl7 size-201">
                Any questions? Let us know in store at 8th floor, 379 Hudson St,
                New York, NY 10018 or call us on (+1) 96 716 6879
              </p>

              <div className="p-t-27">
                <Link to="#" className="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                  <i className="fa fa-facebook"></i>
                </Link>

                <Link to="#" className="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                  <i className="fa fa-instagram"></i>
                </Link>

                <Link to="#" className="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                  <i className="fa fa-pinterest-p"></i>
                </Link>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3 p-b-50">
              <h4 className="stext-301 cl0 p-b-30">Newsletter</h4>

              <form>
                <div className="wrap-input1 w-full p-b-4">
                  <input
                    className="input1 bg-none plh1 stext-107 cl7"
                    type="text"
                    name="email"
                    placeholder="email@example.com"
                  />
                  <div className="focus-input1 trans-04"></div>
                </div>

                <div className="p-t-18">
                  <button className="flex-c-m stext-101 cl0 size-103 bg1 bor1 hov-btn2 p-lr-15 trans-04">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="p-t-40">
            <div className="flex-c-m flex-w p-b-18">
              <Link to="#" className="m-all-1">
                <img src="images/icons/icon-pay-01.png" alt="ICON-PAY" />
              </Link>

              <Link to="#" className="m-all-1">
                <img src="images/icons/icon-pay-02.png" alt="ICON-PAY" />
              </Link>

              <Link to="#" className="m-all-1">
                <img src="images/icons/icon-pay-03.png" alt="ICON-PAY" />
              </Link>

              <Link to="#" className="m-all-1">
                <img src="images/icons/icon-pay-04.png" alt="ICON-PAY" />
              </Link>

              <Link to="#" className="m-all-1">
                <img src="images/icons/icon-pay-05.png" alt="ICON-PAY" />
              </Link>
            </div>

            <p className="stext-107 cl6 txt-center">
              Copyright &copy;
              <script>document.write(new Date().getFullYear());</script>
              All rights reserved | Made with{' '}
              <i className="fa fa-heart-o" aria-hidden="true"></i> by{' '}
              <Link to="https://colorlib.com" target="_blank" rel="noreferrer">
                Colorlib
              </Link>{' '}
              &amp; distributed by{' '}
              <Link
                to="https://themewagon.com"
                target="_blank"
                rel="noreferrer"
              >
                ThemeWagon
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
