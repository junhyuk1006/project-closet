import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// import CSS
import '../assets/styles/components/header.css';
import '../assets/vendor/css-hamburgers/hamburgers.min.css';

// import Image
import closetImage from '../assets/closet-removebg.png';

// import Hooks
import useFixedHeader from '../hooks/useFixedHeader';
import Cart from '../pages/cart/Cart';
import MobileMenu from './main/MobileMenu';
import isValidJwtToken from '../api/auth/isValidJwtToken';
import Dropdown from 'react-bootstrap/Dropdown';

function Header() {
  const isAtTop = useFixedHeader(); // 현재 페이지 스크롤의 최상단 여부
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // 데스크탑 장바구니의 open 상태
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 모바일 메뉴의 open 상태
  const [isSearching, setIsSearching] = useState(false); // 데스크탑의 검색창 open 상태
  const [inputValue, setInputValue] = useState(''); // 검색창 입력값 상태
  const [show, setShow] = useState(false); // 카테고리의 열림 상태

  // 카테고리 dropdown 열기/닫기 토글
  const toggleMouseEnter = () => setShow(true);
  const toggleMouseLeave = () => setShow(false);

  // 검색창 상태가 변경될 때마다 입력값을 초기화
  useEffect(() => {
    setInputValue('');
  }, [isSearching]);

  // 모든 상태가 변할 때마다 해당 로직이 호출 (2번째 인자를 비워둠)
  // 페이지를 새로고침시키는 등 적절한 상황에만 호출하도록 수정 필요
  useEffect(() => {
    setIsAuthenticated(isValidJwtToken());
    console.log(`isAuthenticated ${isAuthenticated}`);
  });

  // 장바구니 열기/닫기 토글
  const toggleCart = (prev) => {
    console.log(`장바구니 토글 (isCartOpen): ${isCartOpen}`);
    setIsCartOpen(!prev);
  };

  // 모바일 메뉴 열기/닫기 토글
  const toggleMobileMenu = () => {
    setIsMenuOpen((prev) => !prev);
    console.log(
      `모바일 화면의 햄버거 버튼을 클릭하였습니다. (현재 상태: ${isMenuOpen})`
    );
  };

  // 검색창 열기/닫기 토글
  const toggleSearch = (prev) => {
    const newState = !prev;
    console.log(`검색 버튼 클릭 (현재상태: ${newState})`);
    setIsSearching(newState);
  };

  // 검색 폼 제출
  const submitSearchForm = () => {
    fetch('http://localhost:80/product?key=' + inputValue, {
      method: 'POST',
      body: JSON.stringify({ key: inputValue }),
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <header className="header">
      <Cart isCartOpen={isCartOpen} toggleCart={toggleCart} />

      {/* 모바일 헤더 ( 화면 너비가 991px보다 작을 때 ) */}
      <div className="wrap-header-mobile">
        <div className="logo-mobile">
          <Link to="/">
            <img src={closetImage} alt="LOGO" />
          </Link>
        </div>

        <div className="wrap-icon-header flex-w flex-r-m m-r-15">
          <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 js-show-modal-search">
            <i className="zmdi zmdi-search"></i>
          </div>

          <div
            className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart"
            data-notify="2"
          >
            <i className="zmdi zmdi-shopping-cart"></i>
          </div>

          <a
            href="#"
            className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti"
            data-notify="0"
          >
            <i className="zmdi zmdi-favorite-outline"></i>
          </a>
        </div>

        <div
          className={`btn-show-menu-mobile hamburger hamburger--squeeze ${isMenuOpen ? 'is-active' : ''}`}
        >
          <div className="hamburger-box" onClick={toggleMobileMenu}>
            <div className="hamburger-inner"></div>
          </div>
        </div>
      </div>

      {/* 메뉴 패널 open 시 배경 클릭을 막는 오버레이 */}
      {isMenuOpen && (
        <div
          className="overlay"
          onClick={() => setIsMenuOpen(false)} // 배경 클릭 시 메뉴 닫기
        ></div>
      )}

      {/* 모바일 메뉴 */}
      <MobileMenu isMenuOpen={isMenuOpen} />

      {/* Modal Search */}
      <div className="modal-search-header flex-c-m trans-04 js-hide-modal-search">
        <div className="container-search-header">
          <button className="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search">
            <img src="images/icons/icon-close2.png" alt="CLOSE" />
          </button>

          <form className="wrap-search-header flex-w p-l-15">
            <button className="flex-c-m trans-04">
              <i className="zmdi zmdi-search"></i>
            </button>
            <input
              className="plh3"
              type="text"
              name="search"
              placeholder="Search..."
            />
          </form>
        </div>
      </div>

      {/* 데스크탑 헤더 ( 화면 너비가 992px보다 클 때 ) */}
      <div className="container-menu-desktop">
        <div className="top-bar">
          <div className="content-topbar flex-sb-m h-full container">
            <div className="left-top-bar"></div>
            <div className="right-top-bar flex-w h-full">
              <Link
                to="/MyPageHome"
                className="flex-c-m trans-04 p-lr-25"
                onClick={(e) => {
                  if (!isAuthenticated) {
                    alert('로그인이 필요합니다.');
                    console.log(
                      `로그인 상태 (isAuthenticated): ${isAuthenticated}`
                    );
                    e.preventDefault();
                  }
                }}
              >
                마이페이지
              </Link>

              {isAuthenticated ? (
                <Link
                  to="/Logout"
                  className="flex-c-m trans-04 p-lr-25"
                  onClick={(e) => {
                    localStorage.removeItem('token');
                    alert('정상적으로 로그아웃되었습니다.');
                    setIsAuthenticated(false);
                    e.preventDefault();
                  }}
                >
                  로그아웃
                </Link>
              ) : (
                <Link to="/Login" className="flex-c-m trans-04 p-lr-25">
                  로그인
                </Link>
              )}
            </div>
          </div>
        </div>

        <div
          className="wrap-menu-desktop"
          style={{
            top: isAtTop ? '40px' : '0',
            backgroundColor: isAtTop ? 'transparent' : '#fff',
            height: isAtTop ? '84px' : '64px',
            boxShadow: isAtTop ? 'none' : '0 4px 6px rgba(0, 0, 0, 0.1)',
            opacity: isAtTop ? '1' : '0.95',
            transition: isAtTop
              ? 'top 0.3s cubic-bezier(0.1, 0.6, 0.1, 1), background-color 0.3s ease-in-out, height 0.3s ease-in-out, box-shadow 0.3s ease-in-out, opacity 0.3s ease-in-out'
              : 'top 0.2s cubic-bezier(0.25, 0.7, 1, 1), background-color 0.5s ease-in-out, height 0.5s ease-in-out, box-shadow 0.5s ease-in-out, opacity 0.5s ease-in-out',
          }}
        >
          <nav className="limiter-menu-desktop container">
            <Link to="/" className="logo">
              <img src={closetImage} alt="LOGO" />
            </Link>

            <div className="menu-desktop">
              <ul className="main-menu">
                <li>
                  <Dropdown
                    onMouseEnter={toggleMouseEnter}
                    onMouseLeave={toggleMouseLeave}
                    show={show}
                  >
                    <Dropdown.Toggle variant="" id="">
                      <Link to="#">카테고리</Link>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="/shop">아우터</Dropdown.Item>
                      <Dropdown.Item href="/shop">상의</Dropdown.Item>
                      <Dropdown.Item href="/shop">바지</Dropdown.Item>
                      <Dropdown.Item href="/shop">치마</Dropdown.Item>
                      <Dropdown.Item href="/shop">신발</Dropdown.Item>
                      <Dropdown.Item href="/shop">악세서리</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item href="/shop">전체</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li>
                  <Link to="/ShoppingCart">장바구니</Link>
                </li>
                <li className="label1" data-label1="hot">
                  <Link to="/Recommend">스타일링</Link>
                </li>
                <li>
                  <Link to="/Community">커뮤니티</Link>
                </li>
              </ul>
            </div>
            <div className="wrap-icon-header flex-w flex-r-m">
              <input
                className={`header-search ${isSearching ? '' : 'dis-none'}`}
                type="text"
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    console.log(`${e.key} 입력 (검색)`);
                    submitSearchForm();
                  }
                }}
                value={inputValue}
              />
              <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11">
                <i
                  className="zmdi zmdi-search"
                  onClick={() => toggleSearch(isSearching)}
                ></i>
              </div>
              <div
                className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti"
                onClick={() => {
                  console.log('Cart icon clicked');
                  toggleCart(isCartOpen); // 장바구니 열림 상태 토글
                }}
                style={{ cursor: 'pointer' }}
                data-notify="2"
              >
                <i className="zmdi zmdi-shopping-cart"></i>
              </div>
              <Link
                to="#"
                className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti"
                data-notify="0"
              >
                <i className="zmdi zmdi-favorite-outline"></i>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
