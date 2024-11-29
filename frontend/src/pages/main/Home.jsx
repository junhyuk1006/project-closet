import React, {useState} from "react";
import "../../assets/styles/main.css"
import "../../assets/styles/util.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css';
import Header from "../../components/Header";





function Home() {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <div className="animsition">
            {/* Header */}
            <Header />

            {/*Cart*/}
            {isCartOpen && ( // 상태에 따라 장바구니 패널 표시
                <div className="wrap-header-cart js-panel-cart">
                <div className="s-full js-hide-cart"></div>

                <div className="header-cart flex-col-l p-l-65 p-r-25">
                    <div className="header-cart-title flex-w flex-sb-m p-b-8">
				<span className="mtext-103 cl2">
					Your Cart
				</span>

                        <div className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart">
                            <i className="zmdi zmdi-close"></i>
                        </div>
                    </div>

                    <div className="header-cart-content flex-w js-pscroll">
                        <ul className="header-cart-wrapitem w-full">
                            <li className="header-cart-item flex-w flex-t m-b-12">
                                <div className="header-cart-item-img">
                                    <img src="images/item-cart-01.jpg" alt="IMG"/>
                                </div>

                                <div className="header-cart-item-txt p-t-8">
                                    <a href="#" className="header-cart-item-name m-b-18 hov-cl1 trans-04">
                                        White Shirt Pleat
                                    </a>

                                    <span className="header-cart-item-info">
								1 x $19.00
							</span>
                                </div>
                            </li>

                            <li className="header-cart-item flex-w flex-t m-b-12">
                                <div className="header-cart-item-img">
                                    <img src="images/item-cart-02.jpg" alt="IMG"/>
                                </div>

                                <div className="header-cart-item-txt p-t-8">
                                    <a href="#" className="header-cart-item-name m-b-18 hov-cl1 trans-04">
                                        Converse All Star
                                    </a>

                                    <span className="header-cart-item-info">
								1 x $39.00
							</span>
                                </div>
                            </li>

                            <li className="header-cart-item flex-w flex-t m-b-12">
                                <div className="header-cart-item-img">
                                    <img src="images/item-cart-03.jpg" alt="IMG"/>
                                </div>

                                <div className="header-cart-item-txt p-t-8">
                                    <a href="#" className="header-cart-item-name m-b-18 hov-cl1 trans-04">
                                        Nixon Porter Leather
                                    </a>

                                    <span className="header-cart-item-info">
								1 x $17.00
							</span>
                                </div>
                            </li>
                        </ul>

                        <div className="w-full">
                            <div className="header-cart-total w-full p-tb-40">
                                Total: $75.00
                            </div>

                            <div className="header-cart-buttons flex-w w-full">
                                <a href="../../../../../Downloads/cozastore-master/shoping-cart.html"
                                   className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10">
                                    View Cart
                                </a>

                                <a href="../../../../../Downloads/cozastore-master/shoping-cart.html"
                                   className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10">
                                    Check Out
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}

            {/* Slider */}
            <section className="section-slide">
                <div className="wrap-slick1">
                    <div className="slick1">
                        <div
                            className="item-slick1"
                            style={{backgroundImage: "url(images/slide-01.jpg)"}}
                        >
                            <div className="container h-full">
                                <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">
                      <span className="ltext-101 cl2 respon2">
                        Women Collection 2018
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
                                <img src="images/banner-01.jpg" alt="IMG-BANNER"/>

                                <a href="../../../../../Downloads/cozastore-master/product.html"
                                   className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
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
                                <img src="images/banner-02.jpg" alt="IMG-BANNER"/>

                                <a href="../../../../../Downloads/cozastore-master/product.html"
                                   className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
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
                                <img src="images/banner-03.jpg" alt="IMG-BANNER"/>

                                <a href="../../../../../Downloads/cozastore-master/product.html"
                                   className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
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


            <section className="bg0 p-t-23 p-b-140">
                <div className="container">
                    <div className="p-b-10">
                        <h3 className="ltext-103 cl5">
                            Product Overview
                        </h3>
                    </div>

                    <div className="flex-w flex-sb-m p-b-52">
                        <div className="flex-w flex-l-m filter-tope-group m-tb-10">
                            <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 how-active1"
                                    data-filter="*">
                                All Products
                            </button>

                            <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter=".women">
                                Women
                            </button>

                            <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter=".men">
                                Men
                            </button>

                            <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter=".bag">
                                Bag
                            </button>

                            <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter=".shoes">
                                Shoes
                            </button>

                            <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter=".watches">
                                Watches
                            </button>
                        </div>

                        <div className="flex-w flex-c-m m-tb-10">
                            <div
                                className="flex-c-m stext-106 cl6 size-104 bor4 pointer hov-btn3 trans-04 m-r-8 m-tb-4 js-show-filter">
                                <i className="icon-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-filter-list"></i>
                                <i className="icon-close-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none"></i>
                                Filter
                            </div>

                            <div
                                className="flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4 js-show-search">
                                <i className="icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search"></i>
                                <i className="icon-close-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none"></i>
                                Search
                            </div>
                        </div>

                        {/*Search product*/}
                        <div className="dis-none panel-search w-full p-t-10 p-b-15">
                            <div className="bor8 dis-flex p-l-15">
                                <button className="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04">
                                    <i className="zmdi zmdi-search"></i>
                                </button>

                                <input className="mtext-107 cl2 size-114 plh2 p-r-15" type="text" name="search-product"
                                       placeholder="Search"/>
                            </div>
                        </div>

                        {/*Filter*/}
                        <div className="dis-none panel-filter w-full p-t-10">
                            <div className="wrap-filter flex-w bg6 w-full p-lr-40 p-t-27 p-lr-15-sm">
                                <div className="filter-col1 p-r-15 p-b-27">
                                    <div className="mtext-102 cl2 p-b-15">
                                        Sort By
                                    </div>

                                    <ul>
                                        <li className="p-b-6">
                                            <a href="#" className="filter-link stext-106 trans-04">
                                                Default
                                            </a>
                                        </li>

                                        <li className="p-b-6">
                                            <a href="#" className="filter-link stext-106 trans-04">
                                                Popularity
                                            </a>
                                        </li>

                                        <li className="p-b-6">
                                            <a href="#" className="filter-link stext-106 trans-04">
                                                Average rating
                                            </a>
                                        </li>

                                        <li className="p-b-6">
                                            <a href="#" className="filter-link stext-106 trans-04 filter-link-active">
                                                Newness
                                            </a>
                                        </li>

                                        <li className="p-b-6">
                                            <a href="#" className="filter-link stext-106 trans-04">
                                                Price: Low to High
                                            </a>
                                        </li>

                                        <li className="p-b-6">
                                            <a href="#" className="filter-link stext-106 trans-04">
                                                Price: High to Low
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="filter-col2 p-r-15 p-b-27">
                                    <div className="mtext-102 cl2 p-b-15">
                                        Price
                                    </div>

                                    <ul>
                                        <li className="p-b-6">
                                            <a href="#" className="filter-link stext-106 trans-04 filter-link-active">
                                                All
                                            </a>
                                        </li>

                                        <li className="p-b-6">
                                            <a href="#" className="filter-link stext-106 trans-04">
                                                $0.00 - $50.00
                                            </a>
                                        </li>

                                        <li className="p-b-6">
                                            <a href="#" className="filter-link stext-106 trans-04">
                                                $50.00 - $100.00
                                            </a>
                                        </li>

                                        <li className="p-b-6">
                                            <a href="#" className="filter-link stext-106 trans-04">
                                                $100.00 - $150.00
                                            </a>
                                        </li>

                                        <li className="p-b-6">
                                            <a href="#" className="filter-link stext-106 trans-04">
                                                $150.00 - $200.00
                                            </a>
                                        </li>

                                        <li className="p-b-6">
                                            <a href="#" className="filter-link stext-106 trans-04">
                                                $200.00+
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="filter-col3 p-r-15 p-b-27">
                                    <div className="mtext-102 cl2 p-b-15">
                                        Color
                                    </div>

                                    <ul>
                                        <li className="p-b-6">
									<span className="fs-15 lh-12 m-r-6" style={{color: "#222"}}>
										<i className="zmdi zmdi-circle"></i>
									</span>

                                            <a href="#" className="filter-link stext-106 trans-04">
                                                Black
                                            </a>
                                        </li>

                                        <li className="p-b-6">
									<span className="fs-15 lh-12 m-r-6" style={{color: "#4272d7"}}>
										<i className="zmdi zmdi-circle"></i>
									</span>

                                            <a href="#" className="filter-link stext-106 trans-04 filter-link-active">
                                                Blue
                                            </a>
                                        </li>

                                        <li className="p-b-6">
									<span className="fs-15 lh-12 m-r-6" style={{color: "#b3b3b3"}}>
										<i className="zmdi zmdi-circle"></i>
									</span>

                                            <a href="#" className="filter-link stext-106 trans-04">
                                                Grey
                                            </a>
                                        </li>

                                        <li className="p-b-6">
									<span className="fs-15 lh-12 m-r-6" style={{color: "#00ad5f"}}>
										<i className="zmdi zmdi-circle"></i>
									</span>

                                            <a href="#" className="filter-link stext-106 trans-04">
                                                Green
                                            </a>
                                        </li>

                                        <li className="p-b-6">
									<span className="fs-15 lh-12 m-r-6" style={{color: "#fa4251"}}>
										<i className="zmdi zmdi-circle"></i>
									</span>

                                            <a href="#" className="filter-link stext-106 trans-04">
                                                Red
                                            </a>
                                        </li>

                                        <li className="p-b-6">
									<span className="fs-15 lh-12 m-r-6" style={{color: "#aaa"}}>
										<i className="zmdi zmdi-circle-o"></i>
									</span>

                                            <a href="#" className="filter-link stext-106 trans-04">
                                                White
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="filter-col4 p-b-27">
                                    <div className="mtext-102 cl2 p-b-15">
                                        Tags
                                    </div>

                                    <div className="flex-w p-t-4 m-r--5">
                                        <a href="#"
                                           className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5">
                                            Fashion
                                        </a>

                                        <a href="#"
                                           className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5">
                                            Lifestyle
                                        </a>

                                        <a href="#"
                                           className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5">
                                            Denim
                                        </a>

                                        <a href="#"
                                           className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5">
                                            Streetstyle
                                        </a>

                                        <a href="#"
                                           className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5">
                                            Crafts
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row isotope-grid">
                        <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                            {/*Block2*/}
                            <div className="block2">
                                <div className="block2-pic hov-img0">
                                    <img src="images/product-01.jpg" alt="IMG-PRODUCT"/>

                                    <a href="#"
                                       className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                        Quick View
                                    </a>
                                </div>

                                <div className="block2-txt flex-w flex-t p-t-14">
                                    <div className="block2-txt-child1 flex-col-l ">
                                        <a href="../../../../../Downloads/cozastore-master/product-detail.html"
                                           className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                            Esprit Ruffle Shirt
                                        </a>

                                        <span className="stext-105 cl3">
									$16.64
								</span>
                                    </div>

                                    <div className="block2-txt-child2 flex-r p-t-3">
                                        <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                            <img className="icon-heart1 dis-block trans-04"
                                                 src="images/icons/icon-heart-01.png" alt="ICON"/>
                                            <img className="icon-heart2 dis-block trans-04 ab-t-l"
                                                 src="images/icons/icon-heart-02.png" alt="ICON"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                            {/*Block2*/}
                            <div className="block2">
                                <div className="block2-pic hov-img0">
                                    <img src="images/product-02.jpg" alt="IMG-PRODUCT"/>

                                    <a href="#"
                                       className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                        Quick View
                                    </a>
                                </div>

                                <div className="block2-txt flex-w flex-t p-t-14">
                                    <div className="block2-txt-child1 flex-col-l ">
                                        <a href="../../../../../Downloads/cozastore-master/product-detail.html"
                                           className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                            Herschel supply
                                        </a>

                                        <span className="stext-105 cl3">
									$35.31
								</span>
                                    </div>

                                    <div className="block2-txt-child2 flex-r p-t-3">
                                        <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                            <img className="icon-heart1 dis-block trans-04"
                                                 src="images/icons/icon-heart-01.png" alt="ICON"/>
                                            <img className="icon-heart2 dis-block trans-04 ab-t-l"
                                                 src="images/icons/icon-heart-02.png" alt="ICON"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item men">
                            {/*Block2*/}
                            <div className="block2">
                                <div className="block2-pic hov-img0">
                                    <img src="images/product-03.jpg" alt="IMG-PRODUCT"/>

                                    <a href="#"
                                       className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                        Quick View
                                    </a>
                                </div>

                                <div className="block2-txt flex-w flex-t p-t-14">
                                    <div className="block2-txt-child1 flex-col-l ">
                                        <a href="../../../../../Downloads/cozastore-master/product-detail.html"
                                           className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                            Only Check Trouser
                                        </a>

                                        <span className="stext-105 cl3">
									$25.50
								</span>
                                    </div>

                                    <div className="block2-txt-child2 flex-r p-t-3">
                                        <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                            <img className="icon-heart1 dis-block trans-04"
                                                 src="images/icons/icon-heart-01.png" alt="ICON"/>
                                            <img className="icon-heart2 dis-block trans-04 ab-t-l"
                                                 src="images/icons/icon-heart-02.png" alt="ICON"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                            {/*Block2*/}
                            <div className="block2">
                                <div className="block2-pic hov-img0">
                                    <img src="images/product-04.jpg" alt="IMG-PRODUCT"/>

                                    <a href="#"
                                       className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                        Quick View
                                    </a>
                                </div>

                                <div className="block2-txt flex-w flex-t p-t-14">
                                    <div className="block2-txt-child1 flex-col-l ">
                                        <a href="../../../../../Downloads/cozastore-master/product-detail.html"
                                           className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                            Classic Trench Coat
                                        </a>

                                        <span className="stext-105 cl3">
									$75.00
								</span>
                                    </div>

                                    <div className="block2-txt-child2 flex-r p-t-3">
                                        <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                            <img className="icon-heart1 dis-block trans-04"
                                                 src="images/icons/icon-heart-01.png" alt="ICON"/>
                                            <img className="icon-heart2 dis-block trans-04 ab-t-l"
                                                 src="images/icons/icon-heart-02.png" alt="ICON"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                            {/*Block2*/}
                            <div className="block2">
                                <div className="block2-pic hov-img0">
                                    <img src="images/product-05.jpg" alt="IMG-PRODUCT"/>

                                    <a href="#"
                                       className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                        Quick View
                                    </a>
                                </div>

                                <div className="block2-txt flex-w flex-t p-t-14">
                                    <div className="block2-txt-child1 flex-col-l ">
                                        <a href="../../../../../Downloads/cozastore-master/product-detail.html"
                                           className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                            Front Pocket Jumper
                                        </a>

                                        <span className="stext-105 cl3">
									$34.75
								</span>
                                    </div>

                                    <div className="block2-txt-child2 flex-r p-t-3">
                                        <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                            <img className="icon-heart1 dis-block trans-04"
                                                 src="images/icons/icon-heart-01.png" alt="ICON"/>
                                            <img className="icon-heart2 dis-block trans-04 ab-t-l"
                                                 src="images/icons/icon-heart-02.png" alt="ICON"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item watches">
                            {/*Block2*/}
                            <div className="block2">
                                <div className="block2-pic hov-img0">
                                    <img src="images/product-06.jpg" alt="IMG-PRODUCT"/>

                                    <a href="#"
                                       className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                        Quick View
                                    </a>
                                </div>

                                <div className="block2-txt flex-w flex-t p-t-14">
                                    <div className="block2-txt-child1 flex-col-l ">
                                        <a href="../../../../../Downloads/cozastore-master/product-detail.html"
                                           className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                            Vintage Inspired Classic
                                        </a>

                                        <span className="stext-105 cl3">
									$93.20
								</span>
                                    </div>

                                    <div className="block2-txt-child2 flex-r p-t-3">
                                        <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                            <img className="icon-heart1 dis-block trans-04"
                                                 src="images/icons/icon-heart-01.png" alt="ICON"/>
                                            <img className="icon-heart2 dis-block trans-04 ab-t-l"
                                                 src="images/icons/icon-heart-02.png" alt="ICON"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                            {/*Block2*/}
                            <div className="block2">
                                <div className="block2-pic hov-img0">
                                    <img src="images/product-07.jpg" alt="IMG-PRODUCT"/>

                                    <a href="#"
                                       className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                        Quick View
                                    </a>
                                </div>

                                <div className="block2-txt flex-w flex-t p-t-14">
                                    <div className="block2-txt-child1 flex-col-l ">
                                        <a href="../../../../../Downloads/cozastore-master/product-detail.html"
                                           className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                            Shirt in Stretch Cotton
                                        </a>

                                        <span className="stext-105 cl3">
									$52.66
								</span>
                                    </div>

                                    <div className="block2-txt-child2 flex-r p-t-3">
                                        <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                            <img className="icon-heart1 dis-block trans-04"
                                                 src="images/icons/icon-heart-01.png" alt="ICON"/>
                                            <img className="icon-heart2 dis-block trans-04 ab-t-l"
                                                 src="images/icons/icon-heart-02.png" alt="ICON"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                            {/*Block2*/}
                            <div className="block2">
                                <div className="block2-pic hov-img0">
                                    <img src="images/product-08.jpg" alt="IMG-PRODUCT"/>

                                    <a href="#"
                                       className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                        Quick View
                                    </a>
                                </div>

                                <div className="block2-txt flex-w flex-t p-t-14">
                                    <div className="block2-txt-child1 flex-col-l ">
                                        <a href="../../../../../Downloads/cozastore-master/product-detail.html"
                                           className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                            Pieces Metallic Printed
                                        </a>

                                        <span className="stext-105 cl3">
									$18.96
								</span>
                                    </div>

                                    <div className="block2-txt-child2 flex-r p-t-3">
                                        <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                            <img className="icon-heart1 dis-block trans-04"
                                                 src="images/icons/icon-heart-01.png" alt="ICON"/>
                                            <img className="icon-heart2 dis-block trans-04 ab-t-l"
                                                 src="images/icons/icon-heart-02.png" alt="ICON"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item shoes">
                            {/*Block2*/}
                            <div className="block2">
                                <div className="block2-pic hov-img0">
                                    <img src="images/product-09.jpg" alt="IMG-PRODUCT"/>

                                    <a href="#"
                                       className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                        Quick View
                                    </a>
                                </div>

                                <div className="block2-txt flex-w flex-t p-t-14">
                                    <div className="block2-txt-child1 flex-col-l ">
                                        <a href="../../../../../Downloads/cozastore-master/product-detail.html"
                                           className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                            Converse All Star Hi Plimsolls
                                        </a>

                                        <span className="stext-105 cl3">
									$75.00
								</span>
                                    </div>

                                    <div className="block2-txt-child2 flex-r p-t-3">
                                        <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                            <img className="icon-heart1 dis-block trans-04"
                                                 src="images/icons/icon-heart-01.png" alt="ICON"/>
                                            <img className="icon-heart2 dis-block trans-04 ab-t-l"
                                                 src="images/icons/icon-heart-02.png" alt="ICON"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                            {/*Block2*/}
                            <div className="block2">
                                <div className="block2-pic hov-img0">
                                    <img src="images/product-10.jpg" alt="IMG-PRODUCT"/>

                                    <a href="#"
                                       className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                        Quick View
                                    </a>
                                </div>

                                <div className="block2-txt flex-w flex-t p-t-14">
                                    <div className="block2-txt-child1 flex-col-l ">
                                        <a href="../../../../../Downloads/cozastore-master/product-detail.html"
                                           className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                            Femme T-Shirt In Stripe
                                        </a>

                                        <span className="stext-105 cl3">
									$25.85
								</span>
                                    </div>

                                    <div className="block2-txt-child2 flex-r p-t-3">
                                        <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                            <img className="icon-heart1 dis-block trans-04"
                                                 src="images/icons/icon-heart-01.png" alt="ICON"/>
                                            <img className="icon-heart2 dis-block trans-04 ab-t-l"
                                                 src="images/icons/icon-heart-02.png" alt="ICON"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item men">
                            {/*Block2*/}
                            <div className="block2">
                                <div className="block2-pic hov-img0">
                                    <img src="images/product-11.jpg" alt="IMG-PRODUCT"/>

                                    <a href="#"
                                       className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                        Quick View
                                    </a>
                                </div>

                                <div className="block2-txt flex-w flex-t p-t-14">
                                    <div className="block2-txt-child1 flex-col-l ">
                                        <a href="../../../../../Downloads/cozastore-master/product-detail.html"
                                           className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                            Herschel supply
                                        </a>

                                        <span className="stext-105 cl3">
									$63.16
								</span>
                                    </div>

                                    <div className="block2-txt-child2 flex-r p-t-3">
                                        <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                            <img className="icon-heart1 dis-block trans-04"
                                                 src="images/icons/icon-heart-01.png" alt="ICON"/>
                                            <img className="icon-heart2 dis-block trans-04 ab-t-l"
                                                 src="images/icons/icon-heart-02.png" alt="ICON"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item men">
                            {/*Block2*/}
                            <div className="block2">
                                <div className="block2-pic hov-img0">
                                    <img src="images/product-12.jpg" alt="IMG-PRODUCT"/>

                                    <a href="#"
                                       className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                        Quick View
                                    </a>
                                </div>

                                <div className="block2-txt flex-w flex-t p-t-14">
                                    <div className="block2-txt-child1 flex-col-l ">
                                        <a href="../../../../../Downloads/cozastore-master/product-detail.html"
                                           className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                            Herschel supply
                                        </a>

                                        <span className="stext-105 cl3">
									$63.15
								</span>
                                    </div>

                                    <div className="block2-txt-child2 flex-r p-t-3">
                                        <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                            <img className="icon-heart1 dis-block trans-04"
                                                 src="images/icons/icon-heart-01.png" alt="ICON"/>
                                            <img className="icon-heart2 dis-block trans-04 ab-t-l"
                                                 src="images/icons/icon-heart-02.png" alt="ICON"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                            {/*Block2*/}
                            <div className="block2">
                                <div className="block2-pic hov-img0">
                                    <img src="images/product-13.jpg" alt="IMG-PRODUCT"/>

                                    <a href="#"
                                       className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                        Quick View
                                    </a>
                                </div>

                                <div className="block2-txt flex-w flex-t p-t-14">
                                    <div className="block2-txt-child1 flex-col-l ">
                                        <a href="../../../../../Downloads/cozastore-master/product-detail.html"
                                           className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                            T-Shirt with Sleeve
                                        </a>

                                        <span className="stext-105 cl3">
									$18.49
								</span>
                                    </div>

                                    <div className="block2-txt-child2 flex-r p-t-3">
                                        <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                            <img className="icon-heart1 dis-block trans-04"
                                                 src="images/icons/icon-heart-01.png" alt="ICON"/>
                                            <img className="icon-heart2 dis-block trans-04 ab-t-l"
                                                 src="images/icons/icon-heart-02.png" alt="ICON"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                            {/*Block2*/}
                            <div className="block2">
                                <div className="block2-pic hov-img0">
                                    <img src="images/product-14.jpg" alt="IMG-PRODUCT"/>

                                    <a href="#"
                                       className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                        Quick View
                                    </a>
                                </div>

                                <div className="block2-txt flex-w flex-t p-t-14">
                                    <div className="block2-txt-child1 flex-col-l ">
                                        <a href="../../../../../Downloads/cozastore-master/product-detail.html"
                                           className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                            Pretty Little Thing
                                        </a>

                                        <span className="stext-105 cl3">
									$54.79
								</span>
                                    </div>

                                    <div className="block2-txt-child2 flex-r p-t-3">
                                        <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                            <img className="icon-heart1 dis-block trans-04"
                                                 src="images/icons/icon-heart-01.png" alt="ICON"/>
                                            <img className="icon-heart2 dis-block trans-04 ab-t-l"
                                                 src="images/icons/icon-heart-02.png" alt="ICON"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item watches">
                            {/*Block2*/}
                            <div className="block2">
                                <div className="block2-pic hov-img0">
                                    <img src="images/product-15.jpg" alt="IMG-PRODUCT"/>

                                    <a href="#"
                                       className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                        Quick View
                                    </a>
                                </div>

                                <div className="block2-txt flex-w flex-t p-t-14">
                                    <div className="block2-txt-child1 flex-col-l ">
                                        <a href="../../../../../Downloads/cozastore-master/product-detail.html"
                                           className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                            Mini Silver Mesh Watch
                                        </a>

                                        <span className="stext-105 cl3">
									$86.85
								</span>
                                    </div>

                                    <div className="block2-txt-child2 flex-r p-t-3">
                                        <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                            <img className="icon-heart1 dis-block trans-04"
                                                 src="images/icons/icon-heart-01.png" alt="ICON"/>
                                            <img className="icon-heart2 dis-block trans-04 ab-t-l"
                                                 src="images/icons/icon-heart-02.png" alt="ICON"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                            {/*Block2*/}
                            <div className="block2">
                                <div className="block2-pic hov-img0">
                                    <img src="images/product-16.jpg" alt="IMG-PRODUCT"/>

                                    <a href="#"
                                       className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                        Quick View
                                    </a>
                                </div>

                                <div className="block2-txt flex-w flex-t p-t-14">
                                    <div className="block2-txt-child1 flex-col-l ">
                                        <a href="../../../../../Downloads/cozastore-master/product-detail.html"
                                           className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                            Square Neck Back
                                        </a>

                                        <span className="stext-105 cl3">
									$29.64
								</span>
                                    </div>

                                    <div className="block2-txt-child2 flex-r p-t-3">
                                        <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                            <img className="icon-heart1 dis-block trans-04"
                                                 src="images/icons/icon-heart-01.png" alt="ICON"/>
                                            <img className="icon-heart2 dis-block trans-04 ab-t-l"
                                                 src="images/icons/icon-heart-02.png" alt="ICON"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*Load more*/}
                    <div className="flex-c-m flex-w w-full p-t-45">
                        <a href="#" className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04">
                            Load More
                        </a>
                    </div>
                </div>
            </section>

            <footer className="bg3 p-t-75 p-b-32">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-lg-3 p-b-50">
                            <h4 className="stext-301 cl0 p-b-30">
                                Categories
                            </h4>

                            <ul>
                                <li className="p-b-10">
                                    <a href="#" className="stext-107 cl7 hov-cl1 trans-04">
                                        Women
                                    </a>
                                </li>

                                <li className="p-b-10">
                                    <a href="#" className="stext-107 cl7 hov-cl1 trans-04">
                                        Men
                                    </a>
                                </li>

                                <li className="p-b-10">
                                    <a href="#" className="stext-107 cl7 hov-cl1 trans-04">
                                        Shoes
                                    </a>
                                </li>

                                <li className="p-b-10">
                                    <a href="#" className="stext-107 cl7 hov-cl1 trans-04">
                                        Watches
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-sm-6 col-lg-3 p-b-50">
                            <h4 className="stext-301 cl0 p-b-30">
                                Help
                            </h4>

                            <ul>
                                <li className="p-b-10">
                                    <a href="#" className="stext-107 cl7 hov-cl1 trans-04">
                                        Track Order
                                    </a>
                                </li>

                                <li className="p-b-10">
                                    <a href="#" className="stext-107 cl7 hov-cl1 trans-04">
                                        Returns
                                    </a>
                                </li>

                                <li className="p-b-10">
                                    <a href="#" className="stext-107 cl7 hov-cl1 trans-04">
                                        Shipping
                                    </a>
                                </li>

                                <li className="p-b-10">
                                    <a href="#" className="stext-107 cl7 hov-cl1 trans-04">
                                        FAQs
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-sm-6 col-lg-3 p-b-50">
                            <h4 className="stext-301 cl0 p-b-30">
                                GET IN TOUCH
                            </h4>

                            <p className="stext-107 cl7 size-201">
                                Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or
                                call us on (+1) 96 716 6879
                            </p>

                            <div className="p-t-27">
                                <a href="#" className="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                                    <i className="fa fa-facebook"></i>
                                </a>

                                <a href="#" className="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                                    <i className="fa fa-instagram"></i>
                                </a>

                                <a href="#" className="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                                    <i className="fa fa-pinterest-p"></i>
                                </a>
                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-3 p-b-50">
                            <h4 className="stext-301 cl0 p-b-30">
                                Newsletter
                            </h4>

                            <form>
                                <div className="wrap-input1 w-full p-b-4">
                                    <input className="input1 bg-none plh1 stext-107 cl7" type="text" name="email"
                                           placeholder="email@example.com"/>
                                    <div className="focus-input1 trans-04"></div>
                                </div>

                                <div className="p-t-18">
                                    <button
                                        className="flex-c-m stext-101 cl0 size-103 bg1 bor1 hov-btn2 p-lr-15 trans-04">
                                        Subscribe
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="p-t-40">
                        <div className="flex-c-m flex-w p-b-18">
                            <a href="#" className="m-all-1">
                                <img src="images/icons/icon-pay-01.png" alt="ICON-PAY"/>
                            </a>

                            <a href="#" className="m-all-1">
                                <img src="images/icons/icon-pay-02.png" alt="ICON-PAY"/>
                            </a>

                            <a href="#" className="m-all-1">
                                <img src="images/icons/icon-pay-03.png" alt="ICON-PAY"/>
                            </a>

                            <a href="#" className="m-all-1">
                                <img src="images/icons/icon-pay-04.png" alt="ICON-PAY"/>
                            </a>

                            <a href="#" className="m-all-1">
                                <img src="images/icons/icon-pay-05.png" alt="ICON-PAY"/>
                            </a>
                        </div>

                        <p className="stext-107 cl6 txt-center">
                            Copyright &copy;
                            <script>document.write(new Date().getFullYear());</script>
                            All rights reserved | Made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a
                            href="https://colorlib.com" target="_blank">Colorlib</a> &amp; distributed by <a
                            href="https://themewagon.com" target="_blank">ThemeWagon</a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;