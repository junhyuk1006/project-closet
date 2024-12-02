import { useEffect, useState } from 'react';

export default function FilterSearch({ activeFilter, handleFilterChange }) {
  const [isFiltering, setIsFiltering] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const filters = [
    { label: '최신순', filterKey: 'sortByRecent' },
    { label: '가격 높은순', filterKey: 'sortByPriceDesc' },
    { label: '가격 낮은순', filterKey: 'sortByPriceAsc' },
    { label: '평점', filterKey: 'sortByRating' },
    { label: '리뷰', filterKey: 'sortByReviews' },
  ];

  const tags = [
    { label: '가성비', filterKey: 'costEffectiveness' },
    { label: '스트릿', filterKey: 'street' },
    { label: '캐주얼', filterKey: 'casual' },
    { label: '댄디', filterKey: 'dandy' },
    { label: 'OOTD', filterKey: 'ootd' },
  ];

  const toggleFilter = () => {
    console.log('Filter 버튼을 클릭하였습니다.');
    setIsFiltering((prev) => !prev);
    setIsSearching(false);
  };

  const toggleSearch = () => {
    console.log('Search 버튼을 클릭하였습니다.');
    setIsSearching((prev) => !prev);
    setIsFiltering(false);
  };

  return (
    <>
      <div className="flex-w flex-c-m m-tb-10">
        {/* Filter button */}
        <div
          className={`flex-c-m stext-106 cl6 size-104 bor4 pointer hov-btn3 trans-04 m-r-8 m-tb-4 js-show-filter ${!isFiltering ? '' : 'show-filter'}`}
          onClick={() => {
            toggleFilter();
          }}
        >
          {!isFiltering ? (
            <i className="icon-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-filter-list"></i>
          ) : (
            <i className="icon-close-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close"></i>
          )}
          필터
        </div>

        {/* Search button */}
        <div
          className={`flex-c-m stext-106 cl6 size-104 bor4 pointer hov-btn3 trans-04 m-tb-4 js-show-search ${!isSearching ? '' : 'show-search'}`}
          onClick={() => {
            toggleSearch();
          }}
        >
          {!isSearching ? (
            <i className="icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search"></i>
          ) : (
            <i className="icon-close-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close"></i>
          )}
          검색
        </div>
      </div>

      {/* Filter panel */}
      <div
        className={`${!isFiltering ? 'dis-none' : 'dis-block'} panel-filter w-full p-t-10`}
      >
        <div className="wrap-filter flex-w bg6 w-full p-lr-40 p-t-27 p-lr-15-sm">
          <div className="filter-col1 p-r-15 p-b-27">
            <div className="mtext-102 cl2 p-b-15">
              <b>정렬</b>
            </div>

            <ul>
              {filters.map((filter) => (
                <li key={filter.filterKey} className="p-b-6">
                  <a
                    href="#"
                    className={`filter-link stext-106 trans-04 ${activeFilter === filter.filterKey && 'filter-link-active'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(
                        `FilterSearch에서 클릭한 필터링 데이터: ${filter.filterKey}`
                      );
                      handleFilterChange(filter.filterKey);
                    }}
                  >
                    {filter.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-col2 p-r-15 p-b-27">
            <div className="mtext-102 cl2 p-b-15">
              <b>가격대</b>
            </div>

            <ul>
              <li className="p-b-6">
                <a
                  href="#"
                  className="filter-link stext-106 trans-04 filter-link-active"
                >
                  전체
                </a>
              </li>

              <li className="p-b-6">
                <a href="#" className="filter-link stext-106 trans-04">
                  - ￦50,000
                </a>
              </li>

              <li className="p-b-6">
                <a href="#" className="filter-link stext-106 trans-04">
                  ￦50,000 - ￦100,000
                </a>
              </li>

              <li className="p-b-6">
                <a href="#" className="filter-link stext-106 trans-04">
                  ￦100,000 - ￦150,000
                </a>
              </li>

              <li className="p-b-6">
                <a href="#" className="filter-link stext-106 trans-04">
                  ￦150,000 - ￦200,000
                </a>
              </li>

              <li className="p-b-6">
                <a href="#" className="filter-link stext-106 trans-04">
                  ￦200,000 -
                </a>
              </li>
            </ul>
          </div>

          {/* Color 카테고리를 주석 처리 */}
          {/* <div className="filter-col3 p-r-15 p-b-27">
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
          </div> */}

          <div className="filter-col4 p-b-27">
            <div className="mtext-102 cl2 p-b-15">태그</div>

            <div className="flex-w p-t-4 m-r--5">
              {tags.map((tag) => (
                <a
                  key={tag.filterKey}
                  href="#"
                  className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-10 m-b-10"
                >
                  {tag.label}
                </a>
              ))}
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
