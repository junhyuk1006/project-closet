import { useEffect, useState } from 'react';

export default function Filter() {
    const [isFiltering, setIsFiltering] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const toggleFilter = () => {
        setIsFiltering((prev) => !prev);
    };

    const toggleSearch = () => {
        setIsSearching((prev) => !prev);
    };

    return (
        <>
            <div className="flex-w flex-c-m m-tb-10">
                {/* Filter button */}
                <div
                    className={`flex-c-m stext-106 cl6 size-104 bor4 pointer hov-btn3 trans-04 m-r-8 m-tb-4 js-show-filter ${!isFiltering ? '' : 'show-filter'}`}
                    onClick={toggleFilter}
                >
                    {!isFiltering ? (
                        <i className="icon-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-filter-list"></i>
                    ) : (
                        <i className="icon-close-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close"></i>
                    )}
                    Filter
                </div>

                {/* Search button */}
                <div
                    className={`flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4 js-show-search ${!isSearching ? '' : 'show-search'}`}
                    onClick={toggleSearch}
                >
                    {!isSearching ? (
                        <i className="icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search"></i>
                    ) : (
                        <i className="icon-close-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close"></i>
                    )}
                    Search
                </div>
            </div>

            {/* Filter panel */}
            <div
                className={`${!isFiltering ? 'dis-none' : 'dis-block'} panel-filter w-full p-t-10`}
            >
                <div className="wrap-filter flex-w bg6 w-full p-lr-40 p-t-27 p-lr-15-sm">
                    <div className="filter-col1 p-r-15 p-b-27">
                        <div className="mtext-102 cl2 p-b-15">Sort By</div>

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
                                <a
                                    href="#"
                                    className="filter-link stext-106 trans-04 filter-link-active"
                                >
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
                        <div className="mtext-102 cl2 p-b-15">Price</div>

                        <ul>
                            <li className="p-b-6">
                                <a
                                    href="#"
                                    className="filter-link stext-106 trans-04 filter-link-active"
                                >
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
                        <div className="mtext-102 cl2 p-b-15">Color</div>

                        <ul>
                            <li className="p-b-6">
                <span className="fs-15 lh-12 m-r-6" style={{ color: '#222' }}>
                  <i className="zmdi zmdi-circle"></i>
                </span>

                                <a href="#" className="filter-link stext-106 trans-04">
                                    Black
                                </a>
                            </li>

                            <li className="p-b-6">
                <span
                    className="fs-15 lh-12 m-r-6"
                    style={{ color: '#4272d7' }}
                >
                  <i className="zmdi zmdi-circle"></i>
                </span>

                                <a
                                    href="#"
                                    className="filter-link stext-106 trans-04 filter-link-active"
                                >
                                    Blue
                                </a>
                            </li>

                            <li className="p-b-6">
                <span
                    className="fs-15 lh-12 m-r-6"
                    style={{ color: '#b3b3b3' }}
                >
                  <i className="zmdi zmdi-circle"></i>
                </span>

                                <a href="#" className="filter-link stext-106 trans-04">
                                    Grey
                                </a>
                            </li>

                            <li className="p-b-6">
                <span
                    className="fs-15 lh-12 m-r-6"
                    style={{ color: '#00ad5f' }}
                >
                  <i className="zmdi zmdi-circle"></i>
                </span>

                                <a href="#" className="filter-link stext-106 trans-04">
                                    Green
                                </a>
                            </li>

                            <li className="p-b-6">
                <span
                    className="fs-15 lh-12 m-r-6"
                    style={{ color: '#fa4251' }}
                >
                  <i className="zmdi zmdi-circle"></i>
                </span>

                                <a href="#" className="filter-link stext-106 trans-04">
                                    Red
                                </a>
                            </li>

                            <li className="p-b-6">
                <span className="fs-15 lh-12 m-r-6" style={{ color: '#aaa' }}>
                  <i className="zmdi zmdi-circle-o"></i>
                </span>

                                <a href="#" className="filter-link stext-106 trans-04">
                                    White
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="filter-col4 p-b-27">
                        <div className="mtext-102 cl2 p-b-15">Tags</div>

                        <div className="flex-w p-t-4 m-r--5">
                            <a
                                href="#"
                                className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                            >
                                Fashion
                            </a>

                            <a
                                href="#"
                                className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                            >
                                Lifestyle
                            </a>

                            <a
                                href="#"
                                className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                            >
                                Denim
                            </a>

                            <a
                                href="#"
                                className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                            >
                                Streetstyle
                            </a>

                            <a
                                href="#"
                                className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                            >
                                Crafts
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search panel */}
            <div
                className={`${!isSearching ? 'dis-none' : 'dis-block'} panel-search w-full p-t-10 p-b-15`}
            >
                <div className="bor8 dis-flex p-l-15">
                    <button className="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04">
                        <i className="zmdi zmdi-search"></i>
                    </button>

                    <input
                        className="mtext-107 cl2 size-114 plh2 p-r-15"
                        type="text"
                        name="search-product"
                        placeholder="Search"
                    />
                </div>
            </div>
        </>
    );
}