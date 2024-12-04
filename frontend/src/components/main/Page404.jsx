import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/main/Page404.css';
import Logo from '../../assets/closet-removebg.png';

export default function Page404() {
  const [isSearching, setIsSearching] = useState(false);
  const [inputValue, setInputValue] = useState('');

  function toggleSearch() {
    setIsSearching((prev) => !prev);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log(`검색을 진행합니다: ${inputValue}`);
    }
  };

  return (
    <>
      <div className="error-page container-fluid">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>

        <div className="flex" style={{ alignItems: 'center' }}>
          <div className="p-t-80">
            <h1 className="p-b-50">404</h1>
            <p className="p-b-10">
              Oops! The page you're looking for can't be found.
            </p>
            <p>
              But don't worry, we can help you find what you're looking for.
            </p>
            <p> Use the search bar below to explore our site:</p>
          </div>
          <img
            className="w-full max-width"
            src="/images/icons/glass.png"
            alt="search"
          />
        </div>

        <div className="search-wrapper m-t-20">
          <div
            className={`flex-c-m stext-106 cl6 bor4 pointer hov-btn3 trans-04 js-show-search search-button`}
            style={{ height: '50px' }}
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

          <div
            className={`${!isSearching ? 'dis-none' : 'dis-block'} panel-search w-85p`}
          >
            <div className="bor8 dis-flex" style={{ height: '50px' }}>
              <div className="flex-c-m fs-16 cl2 hov-cl1 trans-04 p-l-15">
                <i className="zmdi zmdi-search"></i>
              </div>

              <input
                className="mtext-107 cl2 plh2 p-l-15 p-r-15 w-full"
                type="text"
                name="search-product"
                placeholder="Search"
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
